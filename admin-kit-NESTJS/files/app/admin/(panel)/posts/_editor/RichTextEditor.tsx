"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { uploadImage } from "../../../_actions/posts";
import styles from "../../../admin.module.css";
import ColorPicker from "./ColorPicker";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const [sourceMode, setSourceMode] = useState(false);
  const [source, setSource] = useState(value);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ inline: false }),
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });

  // Keep the editor in sync if the parent replaces the content wholesale.
  useEffect(() => {
    if (editor && !editor.isFocused && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  const toggleSource = () => {
    if (!editor) return;
    if (sourceMode) {
      editor.commands.setContent(source, { emitUpdate: true });
    } else {
      setSource(editor.getHTML());
    }
    setSourceMode(!sourceMode);
  };

  const onPickImage = async (file: File) => {
    if (!editor) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadImage(fd);
    setUploading(false);
    if (!result.ok) {
      window.alert(result.error);
      return;
    }
    const alt = window.prompt("Describe this image (alt text, important for SEO and accessibility):", "") ?? "";
    editor.chain().focus().setImage({ src: result.url, alt }).run();
  };

  return (
    <div>
      <Toolbar
        editor={editor}
        sourceMode={sourceMode}
        uploading={uploading}
        onToggleSource={toggleSource}
        onImage={() => fileInput.current?.click()}
      />
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void onPickImage(file);
        }}
      />
      {sourceMode ? (
        <textarea
          className={`${styles.textarea} ${styles.htmlSource}`}
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            onChange(e.target.value);
          }}
          spellCheck={false}
          aria-label="HTML source"
        />
      ) : (
        <div className={styles.editorArea}>
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
}

function Toolbar({
  editor,
  sourceMode,
  uploading,
  onToggleSource,
  onImage,
}: {
  editor: Editor | null;
  sourceMode: boolean;
  uploading: boolean;
  onToggleSource: () => void;
  onImage: () => void;
}) {
  if (!editor) return <div className={styles.toolbar} style={{ height: 43 }} />;

  const btn = (label: string, title: string, active: boolean, run: () => void, disabled = false) => (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled || sourceMode}
      className={`${styles.toolButton} ${active ? styles.toolButtonActive : ""}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={run}
    >
      {label}
    </button>
  );

  const chain = () => editor.chain().focus();

  const setLink = () => {
    const previous = (editor.getAttributes("link").href as string | undefined) ?? "";
    const url = window.prompt("Link URL (e.g. https://www.winsquare.in/about-us or /contact-us):", previous);
    if (url === null) return;
    if (url.trim() === "") {
      chain().extendMarkRange("link").unsetLink().run();
      return;
    }
    const external = /^https?:\/\//i.test(url) && !/winsquare\.in/i.test(url);
    const newTab = external && window.confirm("Open this link in a new tab?");
    chain()
      .extendMarkRange("link")
      .setLink({ href: url.trim(), target: newTab ? "_blank" : null })
      .run();
  };

  const editAlt = () => {
    const current = (editor.getAttributes("image").alt as string | undefined) ?? "";
    const alt = window.prompt("Image alt text:", current);
    if (alt !== null) chain().updateAttributes("image", { alt }).run();
  };

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Formatting">
      {btn("P", "Paragraph", editor.isActive("paragraph"), () => chain().setParagraph().run())}
      {btn("H2", "Heading 2", editor.isActive("heading", { level: 2 }), () => chain().toggleHeading({ level: 2 }).run())}
      {btn("H3", "Heading 3", editor.isActive("heading", { level: 3 }), () => chain().toggleHeading({ level: 3 }).run())}
      {btn("H4", "Heading 4", editor.isActive("heading", { level: 4 }), () => chain().toggleHeading({ level: 4 }).run())}
      <span className={styles.toolSep} />
      {btn("B", "Bold", editor.isActive("bold"), () => chain().toggleBold().run())}
      {btn("I", "Italic", editor.isActive("italic"), () => chain().toggleItalic().run())}
      {btn("U", "Underline", editor.isActive("underline"), () => chain().toggleUnderline().run())}
      {btn("S", "Strikethrough", editor.isActive("strike"), () => chain().toggleStrike().run())}
      <ColorPicker editor={editor} disabled={sourceMode} />
      <span className={styles.toolSep} />
      {btn("• List", "Bullet list", editor.isActive("bulletList"), () => chain().toggleBulletList().run())}
      {btn("1. List", "Numbered list", editor.isActive("orderedList"), () => chain().toggleOrderedList().run())}
      {btn("❝", "Quote", editor.isActive("blockquote"), () => chain().toggleBlockquote().run())}
      {btn("―", "Horizontal line", false, () => chain().setHorizontalRule().run())}
      <span className={styles.toolSep} />
      {btn("Link", "Insert / edit link", editor.isActive("link"), setLink)}
      {btn("Unlink", "Remove link", false, () => chain().extendMarkRange("link").unsetLink().run(), !editor.isActive("link"))}
      {btn(uploading ? "Uploading…" : "Image", "Upload image", false, onImage, uploading)}
      {editor.isActive("image") && btn("Alt text", "Edit image alt text", false, editAlt)}
      <span className={styles.toolSep} />
      {btn("↶", "Undo", false, () => chain().undo().run(), !editor.can().undo())}
      {btn("↷", "Redo", false, () => chain().redo().run(), !editor.can().redo())}
      <span style={{ flex: 1 }} />
      <button
        type="button"
        className={`${styles.toolButton} ${sourceMode ? styles.toolButtonActive : ""}`}
        onClick={onToggleSource}
        title="Edit HTML source"
      >
        {sourceMode ? "Visual" : "HTML"}
      </button>
    </div>
  );
}
