var html = require('choo/html')

var TITLE = '🚂🚋🚋'

module.exports = view

function view(state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

    return html `
    <body class="sans-serif">
      <h1 class="f-headline pa3 pa4-ns">
        Choo choo!
      </h1>
      <div>
        Yaaaay Title page!

        <input id="title" type="text" onkeyup=${formChanged} onchange=${formChanged}/>
      </div>
      
    </body>
    `


    function formChanged() {
        var newTitle = document.getElementById("title").value;
        emit(state.events.DOMTITLECHANGE, newTitle);
    }
}