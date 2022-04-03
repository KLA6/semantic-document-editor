class k6sde_select extends k6sde_parent {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // INIT

  async init_depend() {                    // https://github.com/jquery/jquery/issues/3028#issuecomment-207442741
    await $.ajax( { dataType: 'script', url: 'https://cdn.jsdelivr.net/npm/@viselect/vanilla@3.0.0-beta.13/lib/viselect.cjs.min.js'} ) // Visual DOM Selection // https://github.com/Simonwep/selection
  } // init_depend

  init_view() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HTML
    $( window ).on( 'resize', () => this.action_focus() )
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // Visual DOM Selection
    this.parent.object.select.core = new SelectionArea( {
        selectionAreaClass:                                   'k6sde-select'
      , boundaries        : [ `#${this.parent.config.id_elem} .k6sde-page`             ]
      , selectables       : [ `#${this.parent.config.id_elem} .k6sde-page .k6sde-part` ]
    } )
  } // init_view

  init_event() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // Visual DOM Selection // 예제 https://codesandbox.io/s/viselectvanilla-kt332?file=/src/main.ts 를 참조하였으나, 비정상 작동하여 별도로 만들었다.
    this.parent.object.select.core
    .on( 'stop' , ( { store: {  stored                     } } ) =>                                                  this  .action_stop(                         )     ) // stop
    .on( 'start', ( { store,              event              } ) => { if ( ! event.ctrlKey && ! event.metaKey ) {    this  .action_none(                         ) } } ) // start
    .on( 'move' , ( { store: { changed: { added, removed } } } ) => { for( let elem of                  added ) { $( elem ).   addClass( 'k6sde-select-selected' ) }
                                                                      for( let elem of                removed ) { $( elem ).removeClass( 'k6sde-select-selected' ) } } ) // move
  } // init_event

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  action_remove( ID ) { let                                                          ID_SELECTED = []
                        this.parent.object.select.core.getSelection().forEach( V  => ID_SELECTED.push   ( parseInt (          $( V ).attr  ( 'data-id' ) ) ) ) // 함수 deselect 가 비정상 작동하여 별도로 만들었다.
                        this.action_none(); if( typeof ID == 'number' ) ID = [ ID ]; ID_SELECTED.forEach( V => { if( ID.indexOf( V ) < 0 ) { let ELEM = `#${this.parent.config.id_elem} .k6sde-part-${V}`    ; $( ELEM ).   addClass( 'k6sde-select-selected' ); this.parent.object.select.core.     select   ( ELEM ) } } ) ; this.action_stop() }
  action_add   ( ID ) {                     if( typeof ID == 'number' ) ID = [ ID ]; ID         .forEach( V => {                             let ELEM = `#${this.parent.config.id_elem} .k6sde-part-${V}`    ; $( ELEM ).   addClass( 'k6sde-select-selected' ); this.parent.object.select.core.     select   ( ELEM ) }   ) ; this.action_stop() }
  action_new   ( ID ) { this.action_none(); if( typeof ID == 'number' ) ID = [ ID ]; ID         .forEach( V => {                             let ELEM = `#${this.parent.config.id_elem} .k6sde-part-${V}`    ; $( ELEM ).   addClass( 'k6sde-select-selected' ); this.parent.object.select.core.     select   ( ELEM ) }   ) ; this.action_stop() }
  action_all   (    ) {                                                                                                                      let ELEM = `#${this.parent.config.id_elem} .k6sde-part`         ; $( ELEM ).   addClass( 'k6sde-select-selected' ); this.parent.object.select.core.     select   ( ELEM )       ; this.action_stop() }
  action_none  (    ) {                                                                                                                      let ELEM = `#${this.parent.config.id_elem} .k6sde-select-selected`; $( ELEM ).removeClass( 'k6sde-select-selected' ); this.parent.object.select.core.clearSelection(      )       ; this.action_stop() }

  action_stop() {
    k6.dt( `#${this.parent.config.id_elem}.object.select.action_stop`, this                   .action_status() )
                                                                       this.parent.object.part.action_button()
  } // action_stop

  action_status() {
    let                                                                          ID_SELECTED = []
    $( `#${this.parent.config.id_elem} .k6sde-select-selected` ).each( ( I, E ) => ID_SELECTED.push( parseInt( $( E ).attr( 'data-id' ) ) ) )
           this.parent.status.id_part_select                                  =  ID_SELECTED
    if( $( ID_SELECTED.length >  1 ) ) {
      let START = false
      let BREAK = false
      let COUNT = 0
      $( `#${this.parent.config.id_elem} .k6sde-part` ).each( ( I, E ) => {
        if(   BREAK ) return
        if( ! START ) { if( $( E ).hasClass( 'k6sde-select-selected' ) )                 START = true }
        if(   START ) { if( $( E ).hasClass( 'k6sde-select-selected' ) ) COUNT ++ ; else BREAK = true }
      } ) // each
      return [ ID_SELECTED, COUNT == ID_SELECTED.length ?   ID_SELECTED.length
                                                        : - ID_SELECTED.length ]
    } // if
  } // action_status

  action_focus() { // 선택 파트 포커스 보더
    let GROUP_LIST = []
    let GROUP_UNIT = []
    this.parent.status.id_part_select.forEach( ( V, I ) => {
           if(                                                                                                    GROUP_UNIT.length == 0        ) GROUP_UNIT.push( V )                                //   최초 선택 파트
      else if( $( `#${this.parent.config.id_elem} .k6sde-part-${V}` ).prev().hasClass( `k6sde-part-${ GROUP_UNIT[ GROUP_UNIT.length -  1 ] }` ) ) GROUP_UNIT.push( V )                                //   연속 선택 파트
      else                                                                                                  { if( GROUP_UNIT.length >  0 )        GROUP_LIST.push( GROUP_UNIT ); GROUP_UNIT = [ V ] } // 불연속 선택 파트
    } ) /* each */                                                                                          ; if( GROUP_UNIT.length >  0 )        GROUP_LIST.push( GROUP_UNIT )                       //   최종 선택 파트
    $( '.k6sde-select-focus' ).remove()
    GROUP_LIST.forEach( V => {
      let X = $( `#${this.parent.config.id_elem} .k6sde-part-${ V[            0 ] }` ).position().left -  8
      let Y = $( `#${this.parent.config.id_elem} .k6sde-part-${ V[            0 ] }` ).position().top  -  8
      let W = $( `#${this.parent.config.id_elem} .k6sde-part-${ V[            0 ] }` ).width   ()      + 16
      let H = $( `#${this.parent.config.id_elem} .k6sde-part-${ V[ V.length - 1 ] }` ).position().top  + 16
            - $( `#${this.parent.config.id_elem} .k6sde-part-${ V[            0 ] }` ).position().top
            + $( `#${this.parent.config.id_elem} .k6sde-part-${ V[ V.length - 1 ] }` ).height  ()
      $( `#${this.parent.config.id_elem}` ).append( this.view_html.select_focus.replace( '{style}', `left: ${X}px; top: ${Y}px; width: ${W}px; height: ${H}px;` ) )
    } ) // each
  } // action_focus

  action_move() {
    if( this.parent.object.edit.core.isFocused         () ) { // 에디터 포커스 시
      if( event.key == 'ArrowUp'   ) if( this.parent.object.edit.core.getCursorPosition().row !=                                                                        0 ) { this.parent.object.edit.core.navigateUp  (); return true } // 최초 라인 외 무효 // https://stackoverflow.com/a/24609491/8930845
      if( event.key == 'ArrowDown' ) if( this.parent.object.edit.core.getCursorPosition().row != this.parent.object.edit.core.session.getValue().split( '\n' ).length - 1 ) { this.parent.object.edit.core.navigateDown(); return true } // 최종 라인 외 무효
    } // if
    let      SELECTED_ID = this.parent.status.id_part_select
         if( SELECTED_ID.length >  1 ) { if( event.key == 'ArrowUp'   ) this.action_new(                                                            SELECTED_ID[                      0 ]                                 )
                                         if( event.key == 'ArrowDown' ) this.action_new(                                                            SELECTED_ID[ SELECTED_ID.length - 1 ]                                 ) }
    else if( SELECTED_ID.length == 1 ) { if( event.key == 'ArrowUp'   ) this.action_new( parseInt( $( `#${this.parent.config.id_elem} .k6sde-part-${SELECTED_ID[0]}` ).prev ().prev().attr( 'data-id' ) || SELECTED_ID[0] ) )
                                         if( event.key == 'ArrowDown' ) this.action_new( parseInt( $( `#${this.parent.config.id_elem} .k6sde-part-${SELECTED_ID[0]}` ).next ().next().attr( 'data-id' ) || SELECTED_ID[0] ) ) }
    else if( SELECTED_ID.length == 0 ) { if( event.key == 'ArrowUp'   ) this.action_new( parseInt( $( `#${this.parent.config.id_elem} .k6sde-part`                   ).first()       .attr( 'data-id' )                   ) )
                                         if( event.key == 'ArrowDown' ) this.action_new( parseInt( $( `#${this.parent.config.id_elem} .k6sde-part`                   ).last ()       .attr( 'data-id' )                   ) ) }
  } // action_move

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // VIEW

  view_html = {
    select_focus: `<div class="position-absolute rounded pe-none k6sde-select-focus" style="{style}"></div>`,
  } // view_html

} // k6sde_select
