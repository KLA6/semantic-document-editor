class k6sde_part extends k6sde_parent {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // INIT

  init_view() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HTML
    $( `#${this.parent.config.id_elem} .k6sde-page` ).append( this.view_html.part_insert_prev ) // 파트 삽입 상단
    $( `#${this.parent.config.id_elem} .k6sde-page` ).append( this.view_html.part_insert_next ) // 파트 삽입 하단
  } // init_view

  init_event() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HMTL
    $( `#${this.parent.config.id_elem} .k6sde-part-insert` ).on( 'click', () => this.action_insert() )
    // 투두 // 윈도우 리사이즈
  } // init_event

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  action_button() {
    let PAGE     = $( `#${this.parent.config.id_elem}`                        )
    let PART     = $( `#${this.parent.config.id_elem} .k6sde-part`            )
    let PREV     = $( `#${this.parent.config.id_elem} .k6sde-part-prev`       )
    let NEXT     = $( `#${this.parent.config.id_elem} .k6sde-part-next`       )
    let SELECTED = $( `#${this.parent.config.id_elem} .k6sde-select-selected` )
         if( PART    .length == 0
         ||  SELECTED.length == 0 ) { PREV.hide().prependTo   ( PAGE          ); NEXT.show().appendTo   ( PAGE                            ) }
    else if( SELECTED.length >= 1 ) { PREV.show().insertBefore( SELECTED[ 0 ] ); NEXT.show().insertAfter( SELECTED[ SELECTED.length - 1 ] ) }
    this.parent.object.select.action_focus()
  } // action_button

  action_insert() {
    if( this.parent.config.server_coedit ) { this.parent.object.server.action_insert().then( data => { this.parent.status.id_part_last = parseInt( data.test ); this.action_new( this.parent.status.id_part_last ) } ) }
    else                                   {                                                           this.parent.status.id_part_last ++                     ; this.action_new( this.parent.status.id_part_last )     }
  } // action_insert

  action_new( ID ) {
    let                                                                                                                 TARGET = $( `#${this.parent.config.id_elem} .k6sde-part-insert.k6sde-part-next` ) // 핫키, 비동기 등 이벤트 대비
    if( typeof event != 'undefined' ) { event.preventDefault(); if( $( event.target ).hasClass( 'k6sde-part-insert' ) ) TARGET = event.target                                                           } // 클릭            이벤트 대비
    $( TARGET ).closest( 'button' ).before( this.view_html.part.replace( '{class}', `k6sde-part-${ID}` ).replace( '{id}', ID ) )
    this.parent.object.select.action_new( ID )
  } // action_new

  action_delete() {} // part_delete
  action_copy() {} // part_copy
  action_move() {} // part_move

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // VIEW

  view_icon = {
    plus     : [ '-10 0 458 512', `<path fill="currentColor" d="M432 256q-2 22 -24 24h-160v160q-2 22 -24 24q-22 -2 -24 -24v-160h-160q-22 -2 -24 -24q2 -22 24 -24h160v-160q2 -22 24 -24q22 2 24 24v160h160q22 2 24 24v0z"></path>` ],
    empty_set: [ '-10 0 532 512', `<path fill="currentColor" d="M504 7q-17 -14 -34 0l-74 75q-58 -48 -140 -50q-63 1 -113 31q-51 29 -80 80q-30 50 -31 113q2 81 50 140l-75 75q-14 17 0 34q7 7 17 7t17 -7l75 -75q58 48 140 50q63 -1 113 -31q51 -29 80 -80q30 -50 31 -113q-2 -81 -50 -140l75 -75q14 -17 -1 -34v0zM80 256 q2 -75 52 -124v0q49 -50 124 -52q61 1 106 36l-246 246q-35 -45 -36 -106v0zM432 256q-2 75 -52 124v0q-49 50 -124 52q-61 -1 -106 -36l246 -246q35 45 36 106v0z" />` ],
  } // view_icon

  view_html = {
    part_insert_prev: `<button class="my-3 w-100 btn k6sde-btn k6sde-part-insert k6sde-part-prev collapse">${ k6.icon( this.view_icon[ 'plus'      ] ) }</button>`,
    part_insert_next: `<button class="my-3 w-100 btn k6sde-btn k6sde-part-insert k6sde-part-next         ">${ k6.icon( this.view_icon[ 'plus'      ] ) }</button>`,
    part_null       : `<div    class=" p-3 bg-light opacity-50 text-scondary text-center                 ">${ k6.icon( this.view_icon[ 'empty_set' ] ) }</div>`   , // 아래 part 내용 일치 필요
    part: `
      <div        class="k6sde-part      position-relative k6-c-crosshair {class}" data-id="{id}">
        <div      class="k6sde-part-ctrl position-absolute"></div>
        <div      class="k6sde-part-view"><div class="p-3 text-center text-scondary bg-light opacity-50">${ k6.icon( this.view_icon[ 'empty_set' ] ) }</div></div>
        <template class="k6sde-part-code" data-anchor-cursor="0,0,0,0" data-ranges="[[0,0,0,0],]"></template>
      </div>
    `,
  } // view_html

} // k6sde_part
