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

      <div class="ph3 ph4-ns">
        <p>Current number of clicks: ${state.totalClicks}</p>

        <button class="f5 dim br-pill ph3 pv2 mb2 dib white bg-hot-pink bn pointer" onclick=${handleClick}>Click Me!</button>

        <button class="f5 dim br-pill ph3 pv2 mb2 dib white bg-hot-pink bn pointer" onclick=${handleSubtractClick}>Subtract Me!</button>
      </div>

      <button class="f5 dim br-pill ph3 pv2 mb2 dib white bg-hot-pink bn pointer" onclick=${titlePage}>Goto Title page!</button>
      
    </body>
  `

    function handleClick() {
        emit('clicks:add', 1)
    }

    function handleSubtractClick() {
        emit('clicks:subtract', -1)
    }

    function titlePage() {
        emit('clicks:titlePage')
    }
}

192.168 .81 .203