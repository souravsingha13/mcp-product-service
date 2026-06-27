import { mongodb } from '../services/mongodb.js';
import { GetProductDetailsInput, Product } from '../types.js';

function toMultilingualValue(value?: { en?: string; bn?: string }) {
    return value ? { en: value.en || '', bn: value.bn || '' } : { en: '', bn: '' };
}

function toAttributeSummary(attribute: Product['productAttributes'][number]) {
    return {
        uid: attribute.uid,
        label: { en: attribute.enLabel, bn: attribute.bnLabel },
        inputType: attribute.inputType,
        values: attribute.values.map((value) => ({
            enName: value.enName,
            bnName: value.bnName,
        })),
    };
}

export async function getProductDetails(args: GetProductDetailsInput) {
    const collection = mongodb.getProductsCollection();
    console.log("");
    console.log(`Fetching product details for UID: ${args.uid}`);
    const product = await collection.findOne<Product>({ uid: args.uid, isActive: true });

    if (!product) {
        throw new Error(`Product not found for uid: ${args.uid}`);
    }

    const variantPrices = (product.variants || [])
        .map((variant) => variant.mrpPrice)
        .filter((price): price is number => typeof price === 'number');

    const minMrp = variantPrices.length ? Math.min(...variantPrices) : null;
    const maxMrp = variantPrices.length ? Math.max(...variantPrices) : null;
    const availableVariants = (product.variants || []).filter((variant) => variant.isAvailable);

    return {
        uid: product.uid,
        name: {
            en: product.enName,
            bn: product.bnName,
        },
        slug: product.slug,
        category: product.category
            ? {
                uid: product.category.uid,
                enName: product.category.enName,
                bnName: product.category.bnName,
            }
            : null,
        description: product.searchMeta?.description || '',
        image: product.searchMeta?.image || product.images?.[0] || null,
        price: {
            currency: 'BDT',
            minMrp,
            maxMrp,
            availableVariantsCount: availableVariants.length,
        },
        availability: {
            totalVariants: product.variants?.length || 0,
            availableVariantsCount: availableVariants.length,
            inStock: availableVariants.length > 0,
        },
        variants: (product.variants || []).slice(0, 5).map((variant) => ({
            uid: variant.uid,
            colorFamily: variant.colorFamily,
            size: variant.size,
            mrpPrice: variant.mrpPrice,
            previousPrice: variant.previousPrice,
            quantity: variant.quantity,
            isAvailable: variant.isAvailable,
            images: variant.images || [],
        })),
        attributes: [
            ...(product.productAttributes || []).map(toAttributeSummary),
            ...(product.detailedDescriptions || []).map(toAttributeSummary),
            ...(product.priceAndStocks || []).map(toAttributeSummary),
        ].slice(0, 20),
        policies: {
            warranty: toMultilingualValue(product.displayWarrantyPolicy),
            returnPolicy: toMultilingualValue(product.displayReturnPolicy),
        },
        tags: (product.tags || []).map((tag) => ({
            uid: tag.uid,
            enName: tag.enName,
            bnName: tag.bnName,
        })),
        metadata: {
            isActive: product.isActive,
            searchSuggestion: product.searchSuggestion || null,
            searchSynonym: product.searchSynonym || null,
        },
    };
}
