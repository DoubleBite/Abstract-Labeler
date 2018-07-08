// TODO: 整理


//// ================================================ //
////////// Initialize summernote buttons  /////////
//// ================================================ //
createStyleButton = function (name, styleColor) {
    var button = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: '<i class="btn label-btn" style="background-color:' + styleColor + ';">' + name,
            tooltip: name,
            click: function () {
                var range = $('#summernote').summernote('createRange');
                var styleSpan = document.createElement('span');
                styleSpan.style.color = styleColor;
                styleSpan.style.fontWeight = "bold";
                $(styleSpan).text(range.toString());
                $('#summernote').summernote('insertNode', styleSpan);
            }
        });
        return button.render();
    };
    return button;
};

var TargetButton = createStyleButton("Target", "#4ca750");
var MethodButton = createStyleButton("Method", "#007bff");
var ResultButton = createStyleButton("Result", "#dc3545");

var inputButton = function (context) {
    var ui = $.summernote.ui;
    var button = ui.button({
        contents: '<input type="file" multiple id="summernote-fileInput" class="btn btn-sm btn-file">',
        tooltip: name,
    });
    return button.render();
};


var dropdownInputFiles = function (context) {
    var ui = $.summernote.ui;
    var event = ui.buttonGroup([
        ui.button({
            contents: ' <div class="btn btn-dark dropdown-toggle pr-4 pl-4" id="fileList">File list</div>',
            data: {
                toggle: 'dropdown'
            }
        }),
        ui.dropdown({})
    ]);

    return event.render();
};

//// ================================================ //
////////// Initialize the summernote textarea  /////////
//// ================================================ //

$('#summernote').summernote({
    toolbar: [
        ['mybutton', ['dropdown']],
        ['mybutton', ['fileInput']],
        ['mybutton', ['class1', 'class2', 'class3']],
        ['style', ['clear']],
        ['undo'],
        ['redo'],
        ['codeview'],
    ],
    buttons: {
        class1: TargetButton,
        class2: MethodButton,
        class3: ResultButton,
        fileInput: inputButton,
        dropdown: dropdownInputFiles,
    },
    disableResizeEditor: true,
    height: "35vh",
    callbacks: {
        onInit: function () {
            $('.note-editor > .note-editing-area').on('keydown', function (e) {
                $('#summernote').summernote("disable");
                $('#summernote').summernote("enable");
            });

            function renderAbstract(file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#summernote').summernote('code', e.target.result.replace(/\n/g, "<br/>"));
                    $('#summernote').summernote('insertText', "");
                };
                reader.readAsText(file);
            }

            var fileNames = [];
            $("#summernote-fileInput").change(function () {
                // Get the uploded files
                var files = document.getElementById("summernote-fileInput").files;

                // If the uploading succeed
                if (typeof files[0] != "undefined") {

                    // Clear the files uploaded in previous stage
                    fileNames.forEach(function (name) {
                        $("#" + name).remove();
                    });

                    // Read files and save their names
                    fileNames = [];
                    for (var i = 0; i < files.length; i++) {
                        fileNames.push(files[i].name.split(".")[0]);
                    }
                    console.log("Read files: " + fileNames);

                    // Add items of file names to dropdown menu and add click listener to them.
                    fileNames.forEach(function (name, index) {
                        $("#fileList").parent().siblings().append('<a class="dropdown-item" id=' + name + '>' + name + '</a>');
                        $("#" + name).click(function (e) {
                            renderAbstract(files[index]);
                            localStorage.setItem('chosenFile', name);
                        });
                    });

                    // Render with the first file
                    renderAbstract(files[0]);
                    localStorage.setItem('chosenFile', fileNames[0]);

                }
            });

        }
    }
});


$('input[name="type"]').change(function () {
    if (this.value == 'algorithm') {
        $("#description-display1").text("Hint: Novel method or algorithm.");
    } else if (this.value == 'proof') {
        $("#description-display1").text("Hint: Mathematical proof.");
    } else if (this.value == 'survey') {
        $("#description-display1").text("Hint: Paper survey.");
    } else if (this.value == 'application') {
        $("#description-display1").text("Hint: Existing method to new field.");
    } else if (this.value == 'others') {
        $("#description-display1").text("Hint: Other situations.");
    }
});