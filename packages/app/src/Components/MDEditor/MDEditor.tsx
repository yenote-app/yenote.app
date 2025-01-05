import { FC } from 'react'
import { BoldItalicUnderlineToggles, CodeToggle, InsertCodeBlock, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin, thematicBreakPlugin, toolbarPlugin, UndoRedo } from '@mdxeditor/editor'
import { headingsPlugin } from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

export const MDEditor: FC = () => {
	return (
		<MDXEditor
			markdown="# Hello world"

			plugins={[
				headingsPlugin(),
				quotePlugin(),
				listsPlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				toolbarPlugin({
					toolbarClassName: 'my-classname',
					toolbarContents: () => (
						<>
							{' '}
							<UndoRedo />
							<BoldItalicUnderlineToggles />
							<CodeToggle />
							<InsertCodeBlock />
						</>
					)
				}),
			]}
		/>
	)
};
