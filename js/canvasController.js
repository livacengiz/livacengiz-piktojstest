let getThumbnails = function (url) {
    let images = $("#images");
    images.append(`
      <li>
        <img src=" ${url}" class="img-rounded" +
         onclick="addImageToCanvas(this.currentSrc)" />
      </li>`);
};

let addImageToCanvas = function (url) {

    $("#canvasArea").append(`
          <div class="item draggable">
            <div class="close" onclick="removeItem(this)">
              <b>x</b>
            </div>
            <img class="imgItem" src="${url}" data-xPos="0" data-yPos="0" />
          </div>
    `);

    $(".draggable").draggable({
          start: function(){
            $(this).addClass('selected');
          },
          drag: function(){
            let imgElm = $(this).children('img')[0];
            let position = $(this).position();
            let xPos = position.left;
            let yPos = position.top;
            $(imgElm).addClass('selected');
            $(imgElm).attr('data-xPos', xPos);
            $(imgElm).attr('data-ypos', yPos);
          },
          stop: function(){
            $(this).removeClass('selected');
          }
      });
};

let addTextToCanvas = function (text) {
    $('#canvasArea').append(`
      <div class="item draggable">
        <div class="close" onclick="removeItem(this)">
          <b>x</b>
        </div>
        <span data-xPos="0" data-yPos="0">
          ${text}
        </span>
      </div>
      `)
      $(".draggable").draggable({
            start: function() {
              $(this).addClass('selected');
            },
            drag: function(){
              let textElm = $(this).children('span')[0];
              let position = $(this).position();
              let xPos = position.left;
              let yPos = position.top;
              $(textElm).attr('data-xPos', xPos);
              $(textElm).attr('data-ypos', yPos);
            },
            stop: function(){
              $(this).removeClass('selected');
            }
      });
};

let removeItem = function (obj) {
    $(obj).parent().remove();
};
