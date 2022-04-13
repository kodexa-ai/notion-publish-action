import * as core from '@actions/core'
import {Client} from '@notionhq/client'

async function run(): Promise<void> {
  try {
    // Initializing a client
    const notion = new Client({
      auth: core.getInput('notion_token')
    })

    await notion.pages.create({
      parent: {database_id: core.getInput('database_id')},
      properties: {
        Component: {
          title: [
            {
              text: {
                content: core.getInput('component')
              }
            }
          ]
        },
        Version: {
          rich_text: [
            {
              text: {
                content: core.getInput('version')
              }
            }
          ]
        },
        'Test Results': {
          rich_text: [
            {
              text: {
                content: core.getInput('test_results')
              }
            }
          ]
        }
      }
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
