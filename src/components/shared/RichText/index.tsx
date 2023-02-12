import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import { Button, Icon, Toolbar } from './Toolbar';
import { CompactPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSelectedColor } from '@/redux/slices/shared';

const HOTKEYS: { [key: string]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const RichTextExample = () => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = (props: any) => <Leaf {...props} />;
  const [open, setOpen] = useState(false);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={initialValue} >
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="strikethrough" icon="strikethrough_s" />{' '}
        <BlockButton format="left" icon="format_align_left" />{' '}
        <BlockButton format="justify" icon="format_align_justify" />{' '}
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="format-size" icon="format_size" />
        <BlockButton format="font-download" icon="font_download" />
        <ColorToggleButton
          style={{ position: 'relative' }}
          format="format-color"
          icon="format_color_text"
          open={open}
          setOpen={setOpen}
        />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
        className="editor"
      />
    </Slate>
  );
};

const toggleBlock = (editor: ReactEditor, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n['type']) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: any;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: ReactEditor, format: any) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (
  editor: ReactEditor,
  format: any,
  blockType = 'type'
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: ReactEditor, format: any) => {
  const marks: any = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  const { selectedColor } = useSelector(
    (state: RootState) => state.sharedReducer
  );
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: 'line-through' }}>{children}</span>
    );
  }
  if (leaf['format-color']) {
    children = <span style={{ color: selectedColor }}>{children}</span>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const ColorToggleButton = ({ format, icon, open, setOpen }: any) => {
  const editor = useSlate();
  const { selectedColor } = useSelector(
    (state: RootState) => state.sharedReducer
  );
  const dispatch = useDispatch();

  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={() => setOpen(!open)}
    >
      {open && (
        <CompactPicker
          color={selectedColor}
          onChangeComplete={(color: any) => {
            dispatch(setSelectedColor(color.hex));
            toggleMark(editor, format);
            setOpen(!open);
          }}
          className="color-picker"
        />
      )}
      <Icon>{icon}</Icon>
    </Button>
  );
};

const initialValue: any[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>' },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

export default RichTextExample;
