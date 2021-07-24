import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import CodeTool from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from 'simple-image-editorjs'
import AlignmentBlockTune from "editorjs-text-alignment-blocktune"
import Paragraph from '@editorjs/paragraph'

/**
 * Editor JS tools specified for article writing 
 */
export const EDITOR_JS_TOOLS = 
{
    header: {
        class: Header,
        inlineToolbar : true,
        tunes : ['defaultTune']
    },
    image: {
        class : SimpleImage,
        shortcut : 'SHIFT+I'
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ['defaultTune'],
    },
    list: List,
    quote: {
        class : Quote,
        tunes:['defaultTune'],
        shortcut : 'SHIFT+Q'
    },
    marker: Marker,
    code: CodeTool,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    linkTool: LinkTool,
    embed: Embed,
    table: Table,
    raw: Raw,
    defaultTune: {
        class:AlignmentBlockTune,
        config:{
          default: "right",
          blocks: {
            header: 'center',
            quote : "center",
            list: 'right'
          }
        }
    },

}