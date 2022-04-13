import * as core from '@actions/core'
import {Client} from '@notionhq/client'

async function run(): Promise<void> {
  try {
    // Initializing a client
    const notion = new Client({
      auth: core.getInput('notion_token')
    })

    await notion.pages.create({
      parent: {database_id: core.getInput('notion_database_id')},
      properties: JSON.parse(core.getInput('payload'))
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
