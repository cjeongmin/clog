import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useActivatedEditorState } from "../atoms/activatedState";
import { useEditorState } from "../atoms/editorState";

const Button = ({
  active,
  label,
  style,
  onToggle,
}: {
  active: boolean;
  label: string;
  style: string;
  onToggle: (style: string) => void;
}): ReactElement => {
  const toggle: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <>
      <style jsx>{`
        button {
          color: ${active ? "#5890ff" : "#333"};
          cursor: pointer;
          display: inline-block;
          background-color: white;
          border: none;

          transition: 0.2s color;
        }
      `}</style>
      <button onMouseDown={toggle}>{label}</button>
    </>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = ({
  editorState,
  onToggle,
}: {
  editorState: EditorState;
  onToggle: (blockStyle: string) => void;
}): ReactElement => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="block-controls">
      {BLOCK_TYPES.map(({ label, style }) => (
        <Button
          key={label}
          active={style === blockType}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = ({
  editorState,
  onToggle,
}: {
  editorState: EditorState;
  onToggle: (inlineStyle: string) => void;
}): ReactElement => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="inline-controls">
      {INLINE_STYLES.map(({ label, style }) => (
        <Button
          key={label}
          active={currentStyle.has(style)}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      ))}
    </div>
  );
};

const PostEditor = (): ReactElement => {
  const [activatedEditor, _] = useActivatedEditorState();
  const [editorState, setEditorState] = useEditorState();
  const editor = useRef<Editor>(null);

  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };
  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <>
      <style jsx>{`
        .editor {
          height: 100%;
          z-index: 1;
        }

        .toolbar {
          display: flex;
        }
      `}</style>

      {activatedEditor ? (
        <div className="editor" onClick={focusEditor}>
          <div className="toolbar">
            <BlockStyleControls
              editorState={editorState}
              onToggle={toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={toggleInlineStyle}
            />
          </div>
          <hr />
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={(editorState) => setEditorState(editorState)}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostEditor;
