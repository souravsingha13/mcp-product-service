import { Schema, model } from 'mongoose';
import { Product } from '../types.js';

const ProductSchema = new Schema<Product>(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		enName: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		bnName: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		videoUrl: String,
		images: [
			{
				name: String,
				url: String,
			},
		],
		category: {
			uid: String,
			enName: String,
			bnName: String,
		},
		attributeSetUid: String,
		parentCategories: [
			{
				uid: String,
				enName: String,
				bnName: String,
				type: { type: String, default: 'category' },
			},
		],
		productAttributes: [
			{
				uid: String,
				enLabel: {
					type: String,
					required: true,
					trim: true,
				},
				bnLabel: {
					type: String,
					required: true,
					trim: true,
				},
				inputType: {
					type: String,
					default: 'TEXT-FIELD',
					enum: [
						'TEXT-FIELD',
						'TEXT-AREA',
						'TEXT-EDITOR',
						'DATE',
						'DATE-TIME',
						'YES-NO',
						'MULTI-SELECT',
						'DROPDOWN',
						'PRICE',
						'IMAGE',
						'VISUAL-SWITCH',
						'TEXT-SWITCH',
					],
				},
				isRequired: { type: Boolean, default: false },
				isSearchAble: { type: Boolean, default: false },
				isFilterAble: { type: Boolean, default: false },
				values: [
					{
						enName: String,
						bnName: String,
						_id: 0,
					},
				],
				queryName: String,
			},
		],
		detailedDescriptions: [
			{
				uid: String,
				enLabel: {
					type: String,
					required: true,
					trim: true,
				},
				bnLabel: {
					type: String,
					required: true,
					trim: true,
				},
				inputType: {
					type: String,
					default: 'TEXT-FIELD',
					enum: [
						'TEXT-FIELD',
						'TEXT-AREA',
						'TEXT-EDITOR',
						'DATE',
						'DATE-TIME',
						'YES-NO',
						'MULTI-SELECT',
						'DROPDOWN',
						'PRICE',
						'IMAGE',
						'VISUAL-SWITCH',
						'TEXT-SWITCH',
					],
				},
				isRequired: { type: Boolean, default: false },
				isSearchAble: { type: Boolean, default: false },
				isFilterAble: { type: Boolean, default: false },
				values: [
					{
						enName: String,
						bnName: String,
					},
				],
				queryName: String,
			},
		],
		priceAndStocks: [
			{
				uid: String,
				enLabel: {
					type: String,
					required: true,
					trim: true,
				},
				bnLabel: {
					type: String,
					required: true,
					trim: true,
				},
				inputType: {
					type: String,
					default: 'TEXT-FIELD',
					enum: [
						'TEXT-FIELD',
						'TEXT-AREA',
						'TEXT-EDITOR',
						'DATE',
						'DATE-TIME',
						'YES-NO',
						'MULTI-SELECT',
						'DROPDOWN',
						'PRICE',
						'IMAGE',
						'VISUAL-SWITCH',
						'TEXT-SWITCH',
					],
				},
				isRequired: { type: Boolean, default: false },
				isSearchAble: { type: Boolean, default: false },
				isFilterAble: { type: Boolean, default: false },
				values: [
					{
						enName: String,
						bnName: String,
					},
				],
				queryName: String,
			},
		],
		serviceAndDeliveries: [
			{
				uid: String,
				enLabel: {
					type: String,
					required: true,
					trim: true,
				},
				bnLabel: {
					type: String,
					required: true,
					trim: true,
				},
				inputType: {
					type: String,
					default: 'TEXT-FIELD',
					enum: [
						'TEXT-FIELD',
						'TEXT-AREA',
						'TEXT-EDITOR',
						'DATE',
						'DATE-TIME',
						'YES-NO',
						'MULTI-SELECT',
						'DROPDOWN',
						'PRICE',
						'IMAGE',
						'VISUAL-SWITCH',
						'TEXT-SWITCH',
					],
				},
				isRequired: { type: Boolean, default: false },
				isSearchAble: { type: Boolean, default: false },
				isFilterAble: { type: Boolean, default: false },
				values: [
					{
						enName: String,
						bnName: String,
					},
				],
				queryName: String,
			},
		],
		deliveries: [
			{
				uid: String,
				enLabel: {
					type: String,
					required: true,
					trim: true,
				},
				bnLabel: {
					type: String,
					required: true,
					trim: true,
				},
				inputType: {
					type: String,
					default: 'TEXT-FIELD',
					enum: [
						'TEXT-FIELD',
						'TEXT-AREA',
						'TEXT-EDITOR',
						'DATE',
						'DATE-TIME',
						'YES-NO',
						'MULTI-SELECT',
						'DROPDOWN',
						'PRICE',
						'IMAGE',
						'VISUAL-SWITCH',
						'TEXT-SWITCH',
					],
				},
				isRequired: { type: Boolean, default: false },
				values: [
					{
						enName: String,
						bnName: String,
					},
				],
				isSearchAble: { type: Boolean, default: false },
				isFilterAble: { type: Boolean, default: false },
				queryName: String,
			},
		],
		displayReturnPolicy: {
			en: String,
			bn: String,
		},
		displayWarrantyPolicy: {
			en: String,
			bn: String,
		},
		variants: [
			{
				uid: String,
				colorFamily: { type: String, default: 'default' },
				size: { type: String, default: 'default' },
				mrpPrice: Number,
				previousPrice: { type: Number },
				quantity: { type: Number, default: 0 },
				holdQuantity: { type: Number, default: 0 },
				sellerSKU: {
					type: String,
					unique: true,
					required: true,
					trim: true,
				},
				ebsItemCode: { type: String },
				ebsCode: { type: String },
				posItemCode: { type: String, required: true, unique: true },
				isAvailable: { type: Boolean, default: true },
				images: [
					{
						name: String,
						url: String,
					},
				],
				webImage: [
					{
						name: String,
						url: String,
					},
				],
				tabImage: [
					{
						name: String,
						url: String,
					},
				],
				mobileImage: [
					{
						name: String,
						url: String,
					},
				],
				checkSalableQuantity: {
					type: Boolean,
					default: true,
				},
				maxOrderQuantityPerOrder: {
					type: Number,
					default: 5,
				},
				weight: {
					value: Number,
					unit: String,
				},
				packageDimension: {
					length: Number,
					width: Number,
					height: Number,
					unit: String,
				},
			},
		],
		inventory: {
			source: {
				type: String,
				enum: ['IN_HOUSE', 'THIRD_PARTY', 'PLAZA_POS'],
				default: 'PLAZA_POS',
			},
		},
		isInventoryStockCheck: { type: Boolean, default: true },

		searchMeta: {
			urlKey: String,
			title: String,
			keyword: String,
			description: String,
			redirectUrl: String,
			image: {
				name: String,
				url: String,
			},
			embedding: [Number],
		},
		tags: [
			{
				uid: String,
				enName: String,
				bnName: String,
			},
		],
		collections: [
			{
				uid: String,
				enName: String,
				bnName: String,
			},
		],
		isActive: {
			type: Boolean,
			default: false,
		},
		documents: [
			{
				type: { type: String },
				url: String,
				name: String,
			},
		],
		searchSuggestionTag: String,
		searchSuggestion: {
			enTag: String,
			bnTag: String,
		},
		searchSynonym: {
			en: String,
			bn: String,
		},
		inActiveNote: String,
		createdBy: {
			uid: String,
			name: String,
			userType: String,
		},
		updatedBy: {
			uid: String,
			name: String,
			userType: String,
		},
		displayPriority: { type: Number, default: 1 },
		sortPriority: { type: Number, default: 1 },
		isSameDayDelivery: { type: Boolean, default: false },
		isMostLovedProduct: { type: Boolean, default: false },
		isPortableProduct: { type: Boolean, default: false },
		isFeaturedProduct: { type: Boolean, default: false },
		isInventoryStockSync: { type: Boolean, default: false },
		isSerachServiceSync: { type: Boolean, default: false },
		isFirstTimeInventorySync: { type: Boolean, default: false },
		firstTimeInventorySyncCounter: { type: Number, default: 0 },
		isExchangeOfferEnable: { type: Boolean, default: false },
		exchangeOfferUrl: { type: String },
		priceSyncAt: { type: String },
		initialStockSyncAt: { type: String },
		stockSyncAt: { type: String },
		stockSyncDateTime: { type: Date },
		gift: {
			isGiftEnable: { type: Boolean, default: false },
			campaignName: { type: String },
			remarks: { type: String },
		},
		isWrappedWeddingGiftEnable: { type: Boolean, default: false },
		isEmiDisable: { type: Boolean, default: false },
		isPreBookEnable: { type: Boolean, default: false },
		isDiscountPercentageShowable: { type: Boolean, default: true },
		preBookOfficialLaunchTime: { type: Date },
		preBookExpectedDeliveryTime: { type: Date },
		isCashHandlingChargeEnable: { type: Boolean, default: false },
		cashHandlingCharge: { type: Number, default: 0 },
		isWeightBasedDeliveryCharge: { type: Boolean, default: false },
		selectedPlazaUid: { type: String },
		defaultShipmentTitle: String,
		defaultShipmentCharge: { type: Number, default: 0 },
		defaultNotice: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const ProductModel = model<Product>('Product', ProductSchema);

export default ProductModel;
