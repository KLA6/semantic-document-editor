class k6sde_markdown extends k6sde_parent {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // INIT

  async init_depend() {                    // https://github.com/jquery/jquery/issues/3028#issuecomment-207442741
    await $.ajax( { dataType: 'script', url: 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js', attrs: { integrity: 'sha512-TIDbN32lXOg2Mw1VcnKrQLZgfALryJogWCu/NHWtlMCR1jget+mOwMtdehBBZz2f9PKeK2AQPwVxkbl4u/1H5g==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' } } )
    await $.ajax( { dataType: 'script', url: 'https://cdn.jsdelivr.net/npm/markdown-it-attrs@4.1.3/markdown-it-attrs.browser.js'                                                                                                                                                                              } ) // 마크다운 클래스 아이디 속성 // https://stackoverflow.com/a/39214987/8930845
    await $.ajax( { dataType: 'script', url: 'https://cdn.jsdelivr.net/npm/dompurify@2.3.6/dist/purify.min.js'                                                                                                                                                                                                } ) // DOM                    정화 // https://github.com/cure53/DOMPurify
  } // init_depend

  init_view() {
    this.parent.object.markdown.core    = window.markdownit( { html: true } )
    this.parent.object.markdown.core.use( window.markdownItAttrs            )
  } // init_view

} // k6sde_markdown
