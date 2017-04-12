(function () {

    $(document).ready(function () {
        getImages();
        let html = localStorage.getItem("html");
        if (html != null || html != "") {
            $("#canvasArea").html(html);
            $(".draggable").draggable();
        }
    });

    function getImages() {
        $.getJSON("/images/", function (data) {
            for (let i = 0; i < data.length; i++) {
                getThumbnails(data[i]);
            }
        });
    }

    function autoSaveCanvas() {
      let html = $("#canvasArea").html();
      localStorage.setItem('html', html)
      console.log('Canvas Saved')
    }

    $("#submit").click(function () {
      let image = $("#imageInput")[0].files[0];
      if (image === null || image === undefined ) {
        console.warn("Empty Value");
        return;
      } else {
        let formData = new FormData();
        formData.append('upload', image);
          $.ajax({
              url: '/uploads',
              type: 'POST',
              data: formData,
              processData: false,
              cache: false,
              contentType: false,
              success: function (data) {
                  $( "#imageInput" ).val("")
                  getThumbnails(data.file);
              }
          });
      }

    });

    $("#addText").click(function () {
        let text = prompt("Enter your text");
        if (text != null) {
            addTextToCanvas(text);
        }
    });

    // Each 5 seconds call to autoSaveCanvas function for automatic save
    setInterval(autoSaveCanvas, 5000);
})();
