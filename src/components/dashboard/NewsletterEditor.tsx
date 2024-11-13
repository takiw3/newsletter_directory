import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Undo, Redo } from 'lucide-react';
import type { Newsletter } from '../../types/newsletter';

interface NewsletterEditorProps {
  newsletter: Newsletter;
  onUpdate: (content: any) => void;
  isGenerating?: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 p-2 flex items-center space-x-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
      >
        <LinkIcon className="h-4 w-4" />
      </button>
      <div className="flex-1" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <Undo className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <Redo className="h-4 w-4" />
      </button>
    </div>
  );
};

const NewsletterEditor: React.FC<NewsletterEditorProps> = ({ newsletter, onUpdate, isGenerating }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: `
      <h2>Introduction</h2>
      <p>${newsletter.content.intro || ''}</p>
      
      <h2>Featured Story</h2>
      ${newsletter.content.featured_story ? `
        <h3>${newsletter.content.featured_story.title}</h3>
        <p>${newsletter.content.featured_story.description || ''}</p>
      ` : ''}
      
      <h2>News You Can't Miss</h2>
      ${newsletter.content.news.map(article => `
        <h3>${article.title}</h3>
        <p>${article.description || ''}</p>
      `).join('')}
      
      <h2>Conclusion</h2>
      <p>${newsletter.content.outro || ''}</p>
    `,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && newsletter) {
      editor.commands.setContent(`
        <h2>Introduction</h2>
        <p>${newsletter.content.intro || ''}</p>
        
        <h2>Featured Story</h2>
        ${newsletter.content.featured_story ? `
          <h3>${newsletter.content.featured_story.title}</h3>
          <p>${newsletter.content.featured_story.description || ''}</p>
        ` : ''}
        
        <h2>News You Can't Miss</h2>
        ${newsletter.content.news.map(article => `
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
        `).join('')}
        
        <h2>Conclusion</h2>
        <p>${newsletter.content.outro || ''}</p>
      `);
    }
  }, [editor, newsletter]);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {isGenerating ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Generating newsletter content...</p>
        </div>
      ) : (
        <>
          <MenuBar editor={editor} />
          <div className="p-4">
            <EditorContent editor={editor} />
          </div>
        </>
      )}
    </div>
  );
};

export default NewsletterEditor;