class k6sde_hotkey extends k6sde_parent {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // INIT

  async init_depend() {                    // https://github.com/jquery/jquery/issues/3028#issuecomment-207442741
    await $.ajax( { dataType: 'script', url: 'https://cdn.jsdelivr.net/npm/hotkeys-js@3.8.7/dist/hotkeys.min.js'} ) // 핫키 // https://www.jsdelivr.com/package/npm/hotkeys-js
  } // init_depend

  init_else() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HOTKEYS
    for( let [ K, V ] of Object.entries( this.hotkey    )     ) if             ( V.document ) {
      if(    ! V.mac.length            ) this.hotkey[ K ].mac = this.action_mac( V.win      )     //   맥 핫키 부재 → 윈 핫키 대입
      let      T =       [ ... new Set       (        V  .win        .concat   ( V.mac      ) ) ] // 윈맥 핫키 통합 →    중복 제거 // https://stackoverflow.com/a/33121880/8930845
      hotkeys( T.join(), { splitKey: '-' },  ( event, handler ) =>               V.func     ( ) ) // 전역 핫키 설정                 // https://github.com/jaywcjlove/hotkeys#defining-shortcuts
    } // for
  } // init_hotkey

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  action_mac( WIN ) {
    let MAC = []
    WIN.forEach( V => {
      // 투두 // 문자열 치환
      MAC.push( V )
    } ) // foreach
    return MAC
  } // action_mac

  action_menu( TYPE ) { event.preventDefault(); $( `#k6sde-offcanvas-${TYPE}` ).offcanvas( 'toggle' ) }
  action_esc (      ) {                         $( `.k6sde-offcanvas`         ).offcanvas( 'hide'   )
    this.parent.object.select.action_none()
  } // action_esc

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // HOTKEY

  hotkey = [
    { name: 'Esc'        , win: [ 'Esc'                        ], mac: [], document: true, edit: true, func: () => this                     .action_esc   (          ) },
    { name: 'Menu Left'  , win: [ 'F1', 'Ctrl-Alt-Shift-Left'  ], mac: [], document: true, edit: true, func: () => this                     .action_menu  ( 'start'  ) },
    { name: 'Menu Right' , win: [ 'F4', 'Ctrl-Alt-Shift-Right' ], mac: [], document: true, edit: true, func: () => this                     .action_menu  ( 'end'    ) },
    { name: 'Menu Top'   , win: [ 'F7', 'Ctrl-Alt-Shift-Up'    ], mac: [], document: true, edit: true, func: () => this                     .action_menu  ( 'top'    ) },
    { name: 'Menu Bottom', win: [ 'F9', 'Ctrl-Alt-Shift-Down'  ], mac: [], document: true, edit: true, func: () => this                     .action_menu  ( 'bottom' ) },

    { name: 'Select Up'  , win: [ 'Up'                         ], mac: [], document: true, edit: true, func: () => this.parent.object.select.action_move  (          ) },
    { name: 'Select Down', win: [ 'Down'                       ], mac: [], document: true, edit: true, func: () => this.parent.object.select.action_move  (          ) },
    { name: 'Insert Part', win: [ 'Enter'                      ], mac: [], document: true, edit: true, func: () => this.parent.object.part  .action_insert(          ) },
  ] // hotkey

} // class
