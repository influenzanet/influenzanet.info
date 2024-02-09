import { Editor } from '@tinymce/tinymce-react';
// @ts-ignore
import { FormMessage } from '@adminjs/design-system';
import { useState, useEffect } from 'react';
import CustomLabel from "./CustomLabel";


const colorMap= [
  "FCFCFC", "Light",
  "F0F3F6", "Light Accent",
  "979d9d", "Dark Accent",
  "303030", "Dark",
  "003556", "Main",
  "00AB9F", "Accent",
]

const TinyMCE = (props:any)=>{
  let {record, onChange, property} = props
  let name = property.name
  let label = property.label
  // let required = property.isRequired
  let required = property.custom.isRequired
  let error = record?.errors?.[name]

  const [editorValue, setEditorValue] = useState(record.params[name]);
  useEffect(() => {setEditorValue(record.params[name])}, [record, name]);

  const onEditorChange = (content:string) => {
    setEditorValue(content);
    onChange(name, content);
  }

  const customCallback = async (cb, value, meta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0];
      const URI = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        cb(URI, {title: file.name});
      });
      reader.readAsDataURL(file);
    });
  }

  const config = {
    plugins: [
      'image', 'autoresize', 'visualblocks', 'visualchars', 'link', 'media',
      'charmap', 'pagebreak', 'nonbreaking', 'anchor', 'insertdatetime',
      'lists', 'wordcount', 'charmap', 'quickbars', 'emoticons',
    ],
    toolbar: `undo redo | bold italic underline strikethrough removeformat | forecolor backcolor |
      fontselect fontsizeselect formatselect |
      alignleft aligncenter alignright alignjustify | anchor numlist bullist | outdent indent |
      link image | horizontalline hr insertdatetime | charmap emoticons`
    ,
    file_picker_types: 'image',
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.addEventListener('change', (e:any) => {
        const file = e.target.files[0];
        const URI = URL.createObjectURL(file);

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
          */

          /* call the callback and populate the Title field with the file name */
          cb(URI, { title: file.name });
        });
        reader.readAsDataURL(file);
      });

      input.click();
    },
    color_cols: 4,
    color_map_foreground : colorMap,
    color_map_background : colorMap,
    autoresize: true,
    autoresize_bottom_margin: 20,
    branding: false,
    promotion: false,
    height : "480",
    skin: 'tinymce-5',
    body_class: 'tiny-mce-errored',
  }

  const errorStyle = {
    color: 'rgb(194, 0, 18)',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  };

  return (
    <div
      style={{marginBottom: '3rem', position:"relative", zIndex:0}}
      className={error ? 'tiny-mce-errored' : ''}
    >
      <CustomLabel property={property} />
      <Editor
        value={editorValue}
        tinymceScriptSrc="/assets/js/tinymce/tinymce.min.js"
        onEditorChange={onEditorChange}
        init={config}
      ></Editor>
      {!!error && <FormMessage style={errorStyle}>{error.message}</FormMessage>}
    </div>
  )
}

export default TinyMCE
