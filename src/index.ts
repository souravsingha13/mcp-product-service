#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { mongodb } from './services/mongodb.js';
import { searchProducts } from './tools/searchProducts.js';

/**
 * MCP Server Implementation
 */
const server = new Server(
  {
    name: 'walton-product-service',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Register available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_products',
        description: 'Search for Walton products using hybrid search (keyword + vector).',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query in English or Bangla' },
            categoryUid: { type: 'string', description: 'Filter by category ID' },
            minPrice: { type: 'number', description: 'Minimum price' },
            maxPrice: { type: 'number', description: 'Maximum price' },
            limit: { type: 'number', description: 'Number of results to return (default: 5)' },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_product_details',
        description: 'Get full details of a specific product by its UID.',
        inputSchema: {
          type: 'object',
          properties: {
            uid: { type: 'string', description: 'Product UID (e.g., P-PLSAN4)' },
          },
          required: ['uid'],
        },
      },
    ],
  };
});

/**
 * Handle tool execution.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'search_products':
        const searchResults = await searchProducts(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(searchResults, null, 2) }],
        };

      case 'get_product_details':
        // TODO: Implement getProductDetails tool
        return {
          content: [{ type: 'text', text: 'Get product details tool not yet fully implemented.' }],
        };

      default:
        throw new Error(`Tool not found: ${name}`);
    }
  } catch (error) {
    return {
      isError: true,
      content: [{ type: 'text', text: error instanceof Error ? error.message : String(error) }],
    };
  }
});

/**
 * Start the server using Stdio transport.
 */
async function main() {
  try {
    // Connect to MongoDB
    await mongodb.connect();

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Walton Product MCP Server running on stdio');
  } catch (error) {
    console.error('Fatal error in main():', error);
    process.exit(1);
  }
}

main();
