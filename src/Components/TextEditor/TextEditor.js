import { Editor } from "@tinymce/tinymce-react";
import Label from "../FormElements/Label";

export default function TextEditor(props) {
  return (
    <div className="col-12 mb-3 row">
      {props.label && (
        <div className="col-2">
          <Label>{props.label}</Label>
        </div>
      )}

      <div className="col">
        <Editor
          apiKey={process.env.REACT_APP_TEXT_EDITOR_API_KEY}
          initialValue={props.initialValue}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={props.onChange}
        />
      </div>
    </div>
  );
}
