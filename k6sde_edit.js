class k6sde_edit extends k6sde_parent {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // CONSTRUCTOR + INIT

  async init_depend() {                    // https://github.com/jquery/jquery/issues/3028#issuecomment-207442741
    await $.ajax( { dataType: 'script', url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.min.js'               , attrs: { integrity: 'sha512-hDyKEpCc9jPn3u2VffFjScCtNqZI+BAbThAhhDYqqqZbxMqmTSNIgdU0OU9BRD/8wFxHIWLAo561hh9fW7j6sA==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' } } )
    await $.ajax( { dataType: 'script', url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/mode-markdown.min.js'     , attrs: { integrity: 'sha512-sKbmrZYBm8Y1xzHnT6+7ASNF2nQhJqqcnzbML7GC5oiEVNitBYJD5lEi2088idd6zHXaTqZZ7aP7Rw6eFINvQw==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' } } )
    await $.ajax( { dataType: 'script', url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/snippets/markdown.min.js' , attrs: { integrity: 'sha512-TTafQgVD+6Io3DB34I8DD838q2NYmfEKl7PfH8Xw3FpA39poSe3MrfgYOCyNMNNKLEptq3Nu4m6jBOZ7l22IMg==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' } } )
    await $.ajax( { dataType: 'script', url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ext-error_marker.min.js'  , attrs: { integrity: 'sha512-4J/0fXV7jbSwrb4fio0hSnjUgwbQaznUWkeeV/MyVq5O+kFMPDmDOddUJz/Log6cGJ3sCMheo0gvrathVL6Ylg==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' } } )
    await $.ajax( { dataType: 'script', url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ext-language_tools.min.js', attrs: { integrity: 'sha512-S7Whi8oQAQu/MK6AhBWufIJIyOvqORj+/1YDM9MaHeRalsZjzyYS7Usk4fsh+6J77PUhuk5v/BxaMDXRdWd1KA==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' } } ) // 자동 완성 // https://stackoverflow.com/a/19730470/8930845
  } // init_depend

  init_view() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // ACE
    this.parent.object.edit.core =   ace.edit      ( `${this.parent.config.id_elem}-form-code` );
    this.parent.object.edit.core.session.setMode   ( 'ace/mode/markdown'                       );
    this.parent.object.edit.core        .setOptions( { // https://github.com/ajaxorg/ace/wiki/Configuring-Ace
      fontSize                 : 16      ,
      enableBasicAutocompletion: true    ,
      enableLiveAutocompletion : true    ,
      enableSnippets           : true    ,
      showFoldWidgets          : false   ,
      showPrintMargin          : false   ,
      maxLines                 : Infinity, // 자동 높이
    } );
  } // init_view

  init_event() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // ACE
    this.parent.object.edit.core.commands.on( 'afterExec', () => this.action_afterExec() )  // 모든 이벤트 실행 후 트리거 된다.
    this.parent.object.edit.core.session .on( 'change'   , () => this.action_change   () )
  } // init_event

  init_else() {
    //---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HOTKEY
    for( let [ K, V ] of Object.entries( this.parent.object.hotkey.hotkey ) ) if( V.edit ) {
      this.parent.object.edit.core.commands.addCommand( { name: V.name, bindKey: { win: V.win.join( '|' )
                                                                                 , mac: V.mac.join( '|' ) }, exec: ( editor, line ) => V.func(), readOnly: true } ) // 에디터 핫키 설정 // https://github.com/ajaxorg/ace/blob/master/lib/ace/commands/default_commands.js#L366
    } // for
  } // init_else

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  action_afterExec() { // 현재 에디터 앵커 커서 좌표 저장
    let                                                                                                        AC = this.parent.object.edit.core.getSelection()
    $( `#${this.parent.config.id_elem} .k6sde-select-selected .k6sde-part-code` ).attr( 'data-anchor-cursor', `${AC.anchor.row},${AC.anchor.column},${AC.cursor.row},${AC.cursor.column}` )
    // CL( JSON.stringify( this.parent.object.edit.core.getSelection().ranges ) ) // 투두 // 멀티 커서 셀렉션 보존
  } // action_change

  action_change() {
    let TEXT = this.parent.object.edit.core.session.getValue()
    //  TEXT = TEXT.replace( /\t/g, ' ⇥ ' ) // 탭
    let HTML = this.parent.object.markdown.core.render( TEXT )
    $( `#${this.parent.config.id_elem} .k6sde-select-selected .k6sde-part-code` ).html(                    TEXT                                               )
    $( `#${this.parent.config.id_elem} .k6sde-select-selected .k6sde-part-view` ).html( $( HTML ).text() ? HTML : this.parent.object.page.view_html.part_null )
    $( `#${this.parent.config.id_elem} .k6sde-form-html`                        ).html(                    HTML                                               )
    this.parent.object.select.action_focus() // 셀렉트 포커스 엘리먼트 크기 변화 대비
  } // action_change

} // k6sde_edit
