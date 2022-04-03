class k6sde_parent {
  constructor( PARENT ) { this.init_depend().then( () => { this.parent = PARENT; this.init_view()  ; this.init_event()  ; this.init_else()  } ) }
                         async init_depend() {}                                       init_view() {}      init_event() {}      init_else() {}
} // class

/*
  언두 리두 구조 필요
  - 관련 라이브러리 존재 여부 우선 확인
  - 파트 내용, 순서 등 외에 관리할 항목이 있는가...?
*/

class k6sde {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // CONFIG + STATUS + OBJECT

  config = {
    id_elem       : 'k6sde', // SDE 엘리먼트 아이디
    embed         :  false , // 임베드 여부 // 미구현 // 내비, 전역 핫키 등 비활성 // 에디터 위치 임베드 내부 고정
    server_coedit :  false , // 소켓   서버 협업 여부
  } // config

  status = {
    id_user       :  null  ,
    id_book       :  null  ,
    id_page       :  null  ,
    id_part       :  []    ,
    id_part_select:  []    ,
    id_part_last  :  0     , // 마지막 파트 아이디

    server_socket :  null  , // 소켓   서버 주소
    server_book   :  []    , // 북     서버 주소 목록
    server_page   :  []    , // 페이지 서버 주소 목록
    server_part   :  []    , // 블록   서버 주소 목록

    edit_keyboard : 'blink',
    edit_position : 'fix'  ,
  } // status

  object = {
    server        :  null  ,
    user          :  null  ,
    book          :  null  ,
    page          :  null  ,
    part          :  null  ,
    form          :  null  ,
    markdown      :  null  , // Visual DOM Selection // https://github.com/Simonwep/selection/tree/master/packages/vanilla
    select        :  null  , // Ace                  // https://github.com/ajaxorg/ace
    edit          :  null  , // Markdown It          // https://github.com/markdown-it/markdown-it
    hotkey        :  null  , // Hotkeys              // https://github.com/jaywcjlove/hotkeys
  } // object

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // CONSTRUCTOR + INIT

  constructor( CONFIG = {} ) {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // CONFIG
    for( let [ K, V ] of Object.entries( CONFIG ) ) this.CONFIG[ K ] = V
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // OBJECT
    this.object.server   = new k6sde_server  ( this )
    this.object.user     = new k6sde_user    ( this )
    this.object.book     = new k6sde_book    ( this )
    this.object.page     = new k6sde_page    ( this )
    this.object.part     = new k6sde_part    ( this )
    this.object.form     = new k6sde_form    ( this )
    this.object.markdown = new k6sde_markdown( this )
    this.object.select   = new k6sde_select  ( this )
    this.object.edit     = new k6sde_edit    ( this )
    this.object.hotkey   = new k6sde_hotkey  ( this )
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // INIT // 주의 // 자식 오브젝트 생성이 비동기 실행되므로, 아래 함수들에서 자식 오브젝트 함수를 사용할 경우, 실행 순서에 따른 오류가 발생한다.
    this.init_view ()
    this.init_event()
    this.init_else ()
  } // constructor

  init_view() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HMTL
    $( 'body' ).append( this.view_html.container .replace( '{id}', this.config.id_elem ) )
    ; [ [ 'start', 'top'   , 'start' , 'chevron-right', 'k6sde-w-20rem k6sde-aw-75vw' ],
        [ 'end'  , 'bottom', 'end'   , 'chevron-left' , 'k6sde-w-20rem k6sde-aw-75vw' ],
        [ 'end'  , 'top'   , 'top'   , 'chevron-down' , 'k6sde-h-20rem k6sde-ah-75vw' ],
        [ 'start', 'bottom', 'bottom', 'chevron-up'   , 'k6sde-h-20rem k6sde-ah-75vw' ], ].forEach( V => {
      $( 'body' ).append( this.view_html.nav_offcanvas_btn.replace( '{hori}'    ,                          V[ 0 ]       )
                                                          .replace( '{vert}'    ,                          V[ 1 ]       )
                                                          .replace( '{target}'  ,                          V[ 2 ]       )
                                                          .replace( '{icon}'    , k6.icon( this.view_icon[ V[ 3 ] ] ) ) )
      $( 'body' ).append( this.view_html.nav_offcanvas    .replace( '{position}',                          V[ 2 ]       )
                                                          .replace( '{class}'   ,                          V[ 4 ]       )
                                                          .replace( '{id}'      ,                          V[ 2 ]       ) )
    } ) // forEach
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // CONFIG + STATUS // 주의 // 자식 오브젝트 함수 사용이 불가하다. 상기 주의를 참고하라.
    if( ! this.config.embed ) $( `#${this.config.id_elem} .k6sde-form` ).addClass( `k6sde-form-position-${this.status.edit_position}` );
  } // init_view

  init_event() {
  } // init_event

  init_else() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // TRIGGER // 예제로 sde.status.id_page         = ... 실행 시, 트리거                                                          발생 없음
    ; [ 'config', 'status', 'object' ].forEach(       V    => {                                   // 하지만 sde.status.id_page_trigger = ... 실행 시, 트리거                    #k6sde.status.id_user_trigger         발생 있음
      for( let [ K1, V1 ] of Object   .entries( this[ V ] ) ) {                                   //                                         필요 시, 핸들러 $( document ).on( '#k6sde.status.id_user_trigger', ... ) 으로 핸들
        Object.defineProperty( this[ V ],                            `${K1}_trigger`, {
          set: VAR        => { this[ V ][ K1 ]                                      = VAR
                               k6.dt( `#${this.config.id_elem}.config.${K1}_trigger`, VAR ) } // DOCUMENT TRIGGER
        } ) // defineProperty
      } // for
    } ) // forEach
  } // init_else

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // VIEW

  view_icon = {
    'chevron-left' : [ '-10 0 330 512', '<path fill="currentColor" d="M207 465l-183 -191q-8 -10 -8 -18q0 -9 7 -17l183 -191q16 -14 34 0q14 16 0 34l-167 174l168 175q14 18 0 34q-18 14 -34 0v0z"/>' ],
    'chevron-right': [ '-10 0 458 512', '<path fill="currentColor" d="M113 47l183 192q7 7 7 16t-7 17l-183 191q-16 14 -34 1q-14 -17 0 -34l168 -176l-168 -173q-14 -18 0 -34q18 -14 34 0v0z"/>' ],
    'chevron-up'   : [ '-10 0 459 512', '<path fill="currentColor" d="M15 303l192 -183q8 -9 17 -9t17 7l191 183q14 17 0 34q-16 14 -34 1l-174 -167l-175 168q-18 14 -34 -1q-14 -17 0 -33v0z"/>' ],
    'chevron-down' : [ '-10 0 460 512', '<path fill="currentColor" d="M433 209l-191 183q-10 8 -18 8q-9 0 -17 -7l-192 -184q-7 -7 -7 -17t7 -17q16 -14 34 0l175 168l175 -168q18 -14 34 1q7 6 7 16t-7 17v0z"/>' ],
  } // view_icon

  view_html = {
    container: `<div     class="h-100 container py-3 py-md-5 px-3 k6-aw-md">
                  <div   class="h-100 position-relative" id="{id}">
                    <div class="k6sde-page"></div>
                    <div class="k6sde-form my-3 collapse"></div>
                  </div>
                </div>`,
    nav_offcanvas_btn: `<div class="position-fixed {hori}-0 {vert}-0 m-2 m-md-3 d-flex justify-content-center align-items-center rounded bg-light k6-bg-secondary-hover k6-text-white-hover k6-w-2rem k6-h-2rem" data-bs-toggle="offcanvas" data-bs-target="#k6sde-offcanvas-{target}">{icon}</div>`,
    nav_offcanvas: `
      <div        class="offcanvas offcanvas-{position} bg-light {class} k6sde-offcanvas" id="k6sde-offcanvas-{id}" tabindex="-1" data-bs-backdrop="false" data-bs-scroll="true">
        <div      class="offcanvas-header">
          <h5     class="offcanvas-title"></h5>
          <button class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas"></button>
        </div>
        <div      class="offcanvas-body"></div>
      </div>
    `,
  } // view_html

} // class
