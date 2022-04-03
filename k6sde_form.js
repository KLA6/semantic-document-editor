class k6sde_form extends k6sde_parent {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // CONSTRUCTOR + INIT

  init_view() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HTML
    $( `#${this.parent.config.id_elem} .k6sde-form` ).append( this.view_html.form.replace( '{id}', this.parent.config.id_elem ) )
  } // init_view

  init_event() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HMTL
    $( document ).on( `#${this.parent.config.id_elem}.object.select.action_stop`         , ( E, D1, D2 ) => this.action_toggle  ( D1, D2 ) )
    $(                `#${this.parent.config.id_elem} .k6sde-form-position` ).on( 'click', (           ) => this.action_position(        ) )
  } // init_event

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  action_toggle( ID_SELECTED, AMOUNT ) {
    if( AMOUNT != 1 ) $( `#${this.parent.config.id_elem} .k6sde-form`                             ).hide()
    else            { $( `#${this.parent.config.id_elem} .k6sde-form`                             ).show()
      let CODE  =     $( `#${this.parent.config.id_elem} .k6sde-select-selected .k6sde-part-code` ).html()
      let AC    =     $( `#${this.parent.config.id_elem} .k6sde-select-selected .k6sde-part-code` ).attr( 'data-anchor-cursor' ).split( ',' )
      this.parent.object.edit.core          .focus            (                                                                                             )
      this.parent.object.edit.core.session  .setValue         (   CODE                                                                                      )
      this.parent.object.edit.core.selection.moveCursorBy     (                                                         AC[ 2 ],         AC[ 3 ]            ) // 순서 변경 금지
      this.parent.object.edit.core.selection.setSelectionRange( { start: { row: AC[ 0 ], column: AC[ 1 ] }, end: { row: AC[ 2 ], column: AC[ 3 ] } }, false )
    } // else
  } // action_toggle

  action_position( MODE = '' ) {
    if( this.parent.config.embed ) return
    MODE = MODE || $( event.target ).attr( 'data-position' )
    ; [ 'float', 'follow', 'fix' ].forEach( V => {
                        $( `#${this.parent.config.id_elem} .k6sde-form` ).removeClass( `k6sde-form-position-${V}` )
      if( MODE == V ) { $( `#${this.parent.config.id_elem} .k6sde-form` ).   addClass( `k6sde-form-position-${V}` ); this.parent.status.editor_position = MODE }
    } ) // foreach
  } // action_position

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // VIEW

  view_icon = {
    'empty-set'                : [ '-10 0 532 512', `<path fill="currentColor" d="M504 7q-17 -14 -34 0l-74 75q-58 -48 -140 -50q-63 1 -113 31q-51 29 -80 80q-30 50 -31 113q2 81 50 140l-75 75q-14 17 0 34q7 7 17 7t17 -7l75 -75q58 48 140 50q63 -1 113 -31q51 -29 80 -80q30 -50 31 -113q-2 -81 -50 -140l75 -75q14 -17 -1 -34v0zM80 256 q2 -75 52 -124v0q49 -50 124 -52q61 1 106 36l-246 246q-35 -45 -36 -106v0zM432 256q-2 75 -52 124v0q-49 50 -124 52q-61 -1 -106 -36l246 -246q35 45 36 106v0z" />` ],
    'keyboard'                 : [ '-10 0 596 512', '<path fill="currentColor" d="M512 64h-448q-27 1 -45 19t-19 45v256q1 27 19 45t45 19h448q27 -1 45 -19t19 -45v-256q-1 -27 -19 -45t-45 -19v0zM528 384q-1 15 -16 16h-448q-15 -1 -16 -16v-256q1 -15 16 -16h448q15 1 16 16v256v0zM140 152h-24q-11 1 -12 12v24q1 11 12 12h24q11 -1 12 -12v-24 q-1 -11 -12 -12v0zM196 200h24q11 -1 12 -12v-24q-1 -11 -12 -12h-24q-11 1 -12 12v24q1 11 12 12v0zM276 200h24q11 -1 12 -12v-24q-1 -11 -12 -12h-24q-11 1 -12 12v24q1 11 12 12v0zM356 200h24q11 -1 12 -12v-24q-1 -11 -12 -12h-24q-11 1 -12 12v24q1 11 12 12v0z M460 152h-24q-11 1 -12 12v24q1 11 12 12h24q11 -1 12 -12v-24q-1 -11 -12 -12v0zM140 232h-24q-11 1 -12 12v24q1 11 12 12h24q11 -1 12 -12v-24q-1 -11 -12 -12v0zM196 280h24q11 -1 12 -12v-24q-1 -11 -12 -12h-24q-11 1 -12 12v24q1 11 12 12v0zM276 280h24 q11 -1 12 -12v-24q-1 -11 -12 -12h-24q-11 1 -12 12v24q1 11 12 12v0zM356 280h24q11 -1 12 -12v-24q-1 -11 -12 -12h-24q-11 1 -12 12v24q1 11 12 12v0zM460 232h-24q-11 1 -12 12v24q1 11 12 12h24q11 -1 12 -12v-24q-1 -11 -12 -12v0zM400 320h-224q-15 1 -16 16v16 q1 15 16 16h224q15 -1 16 -16v-16q-1 -15 -16 -16v0z"/>' ],
    'eye'                      : [ '-10 0 596 512', '<path fill="currentColor" d="M160 256q1 -54 37 -91v0q37 -36 91 -37q54 1 91 37q36 37 37 91q-1 54 -37 91q-37 36 -91 37q-54 -1 -91 -37q-36 -37 -37 -91v0zM288 336q34 -1 57 -23v0q22 -23 23 -57q-1 -34 -23 -57q-23 -22 -57 -23h-1h-2q3 8 3 16q-1 27 -19 45t-45 19q-8 0 -16 -3v2v0q1 35 23 57 q23 23 57 24v0v0zM95 113q36 -34 84 -57v0q48 -23 109 -24q61 1 109 24t84 57q35 33 58 68t35 63q4 12 0 24q-12 28 -35 63q-23 34 -58 68q-36 34 -84 57t-109 24q-61 -1 -109 -24t-84 -57q-35 -34 -58 -68q-23 -35 -35 -63q-4 -12 0 -24q12 -28 35 -63t58 -68v0v0zM288 80 q-49 1 -89 20v0q-40 18 -71 48q-29 27 -49 56q-19 28 -30 52q11 23 30 52q20 29 49 56q31 30 71 48q40 19 89 20q49 -1 89 -20q40 -18 71 -48q29 -27 48 -56q20 -29 31 -52q-11 -24 -31 -52q-19 -29 -48 -56q-31 -30 -71 -48q-40 -19 -89 -20v0v0z"/>' ],
    'eye-low-vision'           : [ '-11 0 662 512', '<path fill="currentColor" d="M151 93q33 -27 75 -44v0q43 -16 94 -17q61 1 109 24t84 57q35 33 58 68t35 63q4 12 0 24q-11 25 -31 56q-20 32 -49 63l105 82q16 15 4 34q-15 16 -34 4l-592 -464q-16 -15 -4 -34q15 -16 34 -4l112 88v0zM190 124l46 36q35 -31 84 -32q54 1 91 37q36 37 37 91 q0 32 -14 59l54 42q25 -26 43 -53t28 -48q-11 -24 -31 -52q-19 -29 -48 -56q-31 -30 -71 -49t-89 -20q-76 3 -130 45v0v0zM395 284q5 -13 5 -29q-1 -33 -23 -56q-23 -23 -57 -24h-1q-1 1 -2 1q3 8 3 15q0 17 -7 29l82 64v0zM394 469l-339 -265q12 -21 28 -42l363 286 q-24 13 -52 21v0v0zM34 268q-4 -10 -1 -20l80 63q19 27 47 53q40 38 95 58l74 58v0h-9q-61 -1 -109 -24t-84 -57q-35 -34 -58 -68q-23 -35 -35 -63v0v0z"/>' ],
    'eye-slash'                : [ '-11 0 662 512', '<path fill="currentColor" d="M151 93q33 -27 75 -44v0q43 -16 94 -17q61 1 109 24t84 57q35 33 58 68t35 63q4 12 0 24q-11 25 -31 56q-20 32 -49 63l105 82q16 15 4 34q-15 16 -34 4l-592 -464q-16 -15 -4 -34q15 -16 34 -4l112 88v0zM190 124l46 36q35 -31 84 -32q54 1 91 37q36 37 37 91 q0 32 -14 59l54 42q25 -26 43 -53t28 -48q-11 -24 -31 -52q-19 -29 -48 -56q-31 -30 -71 -49t-89 -20q-76 3 -130 45v0v0zM395 284q5 -13 5 -29q-1 -33 -23 -56q-23 -23 -57 -24h-1q-1 1 -2 1q3 8 3 15q0 17 -7 29l82 64v0zM404 415l42 33q-54 30 -126 32q-61 -1 -109 -24 t-84 -57q-35 -34 -58 -68q-23 -35 -35 -63q-4 -12 0 -24q15 -36 49 -82l38 29q-28 36 -40 64q11 24 30 53q20 29 49 56q31 30 71 48q40 19 89 20q46 -1 84 -17v0v0zM192 255v-7l56 44q17 33 54 41l56 45q-18 5 -39 6q-54 -1 -90 -38q-36 -36 -38 -91h1v0z"/>' ],
    'thumbtack'                : [ '-10 0 404 512', '<path fill="currentColor" d="M168 352h-136q-15 0 -25 -12q-9 -13 -6 -28l6 -25q17 -63 69 -98l11 -141h-31q-7 0 -12 -3q-11 -7 -12 -21q2 -22 24 -24h272q22 2 24 24q-1 14 -12 21q-5 3 -12 3h-31l11 141q52 35 69 98l6 25q3 15 -6 28q-9 12 -25 12h-136v136q-2 22 -25 24q-10 0 -17 -7t-7 -17 l1 -136v0zM122 216l-19 13q-37 25 -49 70l-2 5h116v-88q2 -22 24 -24q22 2 24 24v88h116l-2 -5q-13 -45 -49 -70l-20 -13l-12 -168h-114l-13 168v0z"/>' ],
    'ghost'                    : [ '-10 0 403 512', `<path fill="currentColor" d="M192 0h-1v0h-5q-81 5 -132 62q-52 57 -54 138v264q2 15 16 16q6 0 11 -5l25 -18q5 -3 10 -3q7 0 11 5l43 48q6 5 12 5t11 -5l41 -45q5 -6 12 -6t11 6l41 45q6 5 11 5q6 0 11 -5l43 -48q10 -10 22 -2l25 18q5 5 11 5q14 -1 16 -16v-272q-1 -82 -55 -136t-136 -56v0z M336 407q-7 -1 -14 -1q-28 0 -48 21l-18 21l-16 -18q-19 -21 -48 -22q-28 1 -48 22l-16 18l-18 -21q-20 -21 -48 -21q-7 0 -14 1v-207q2 -63 41 -106t99 -46h4q61 2 102 42q40 41 42 102v215v0zM128 159q-14 0 -22 9v0q-9 10 -9 23q0 14 9 23t22 9t22 -9q10 -9 10 -23 q0 -13 -9 -23q-9 -9 -23 -9v0zM256 159q-14 0 -23 9v0q-9 10 -9 23q0 14 9 23t23 9t23 -9t9 -23q0 -13 -9 -23q-9 -9 -23 -9v0z"></path>` ],
    'arrows-to-dotted-line'    : [ '-10 0 468 512', `<path fill="currentColor" d="M32 224q-14 0 -23 9v0q-9 9 -9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM192 256q0 14 9 23v0q9 9 23 9t23 -9t9 -23t-9 -23t-23 -9t-23 9t-9 23v0zM207 184q4 7 17 8q13 -2 17 -7l72 -72q7 -7 7 -17q-2 -22 -24 -24q-10 0 -17 7l-31 31v-86q-2 -22 -24 -24 q-22 2 -24 24v86l-32 -31q-6 -7 -16 -7q-22 2 -24 24q0 10 7 17l72 71v0zM320 224q-14 0 -23 9v0q-9 9 -9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM416 224q-14 0 -23 9v0q-9 9 -9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM240 327q-9 -8 -16 -7q-7 -1 -17 7l-72 72 q-7 7 -7 17q2 22 24 24q10 0 17 -7l31 -31v86q2 22 24 24q22 -2 24 -24v-86l31 31q7 7 17 7q14 -1 19 -9q5 -9 5 -15q0 -10 -7 -17l-73 -72v0zM160 256q0 -14 -9 -23v0q-9 -9 -23 -9t-23 9t-9 23t9 23t23 9t23 -9t9 -23v0z"></path>` ],
    'arrow-down-to-dotted-line': [ '-10 0 468 512', `<path fill="currentColor" d="M224 416q-14 0 -23 9v0q-9 9 -9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM32 416q-14 0 -23 9v0q-9 9 -9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM128 416q-14 0 -23 9v0q-9 9 -9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM320 416q-14 0 -23 9v0q-9 9 -9 23 t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM416 416q-14 0 -23 9v0q-9 9 -9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9v0zM207 361q7 7 17 7v0q10 0 17 -7l128 -136q14 -18 -1 -34q-17 -14 -34 1l-86 92v-212q-2 -22 -24 -24q-22 2 -24 24v212l-87 -92q-7 -8 -17 -8q-9 0 -16 7 q-15 16 -1 34l128 136v0z"></path>` ],
  } // view_icon

  view_html = {
    form: `
      <textarea      class="mb-3 form-control bg-white text-secondary -collapse k6sde-form-html" rows="2" readonly></textarea>
      <div           class="rounded border">
        <div         class="rounded-top border-bottom k6sde-form-code" id="{id}-form-code"></div>
        <div         class="w-100 btn-group           k6sde-form-button">
          <div       class="dropup k6-btn-group-dropdown">
            <button  class="btn btn-light rounded-0 h-100 text-secondary k6-text-white-hover k6-bg-secondary-hover k6-rounded-tl-0" type="button" data-bs-toggle="dropdown">${ k6.icon( this.view_icon[ 'keyboard'  ], 16, 16, 'd-block' ) }</button>
            <ul      class="dropdown-menu">
              <li><a class="dropdown-item d-flex align-items-center k6sde-form-show"   href="javascript:">${ k6.icon( this.view_icon[ 'eye'                       ], 16, 16, 'me-2' ) } Show </a></li>
              <li><a class="dropdown-item d-flex align-items-center k6sde-form-blink"  href="javascript:">${ k6.icon( this.view_icon[ 'eye-low-vision'            ], 16, 16, 'me-2' ) } Blink</a></li>
              <li><a class="dropdown-item d-flex align-items-center k6sde-form-hide"   href="javascript:">${ k6.icon( this.view_icon[ 'eye-slash'                 ], 16, 16, 'me-2' ) } Hide </a></li>
            </ul>
          </div>
          <div       class="dropup k6-btn-group-dropdown">
            <button  class="btn btn-light rounded-0 h-100 text-secondary k6-text-white-hover k6-bg-secondary-hover                " type="button" data-bs-toggle="dropdown">${ k6.icon( this.view_icon[ 'thumbtack' ], 16, 16, 'd-block' ) }</button>
            <ul      class="dropdown-menu">
              <li><a class="dropdown-item d-flex align-items-center k6sde-form-position" data-position="float"  href="javascript:">${ k6.icon( this.view_icon[ 'ghost'                     ], 16, 16, 'me-2' ) } Float </a></li>
              <li><a class="dropdown-item d-flex align-items-center k6sde-form-position" data-position="follow" href="javascript:">${ k6.icon( this.view_icon[ 'arrows-to-dotted-line'     ], 16, 16, 'me-2' ) } Follow</a></li>
              <li><a class="dropdown-item d-flex align-items-center k6sde-form-position" data-position="fix"    href="javascript:">${ k6.icon( this.view_icon[ 'arrow-down-to-dotted-line' ], 16, 16, 'me-2' ) } Fix   </a></li>
            </ul>
          </div>
          <button    class="btn btn-light text-secondary k6-text-white-hover k6-bg-secondary-hover k6-rounded-tr-0" type="button">${ k6.icon( this.view_icon[ 'thumbtack' ] ) }</button>
        </div>
      </div>
      <div   class="mt-3 -collapse k6sde-form-help">
        <div class="k6sde-form-key k6sde-form-key-es">Esc </div><div class="k6sde-form-key k6sde-form-key-f1">F1   </div><div class="k6sde-form-key k6sde-form-key-f2">F2  </div><div class="k6sde-form-key k6sde-form-key-f3">F3 </div><div class="k6sde-form-key k6sde-form-key-f4">F4   </div><div class="k6sde-form-key k6sde-form-key-f5">F5   </div><div class="k6sde-form-key k6sde-form-key-f6">F6</div><div class="k6sde-form-key k6sde-form-key-f7">F7</div><div class="k6sde-form-key k6sde-form-key-f8">F8</div><div class="k6sde-form-key k6sde-form-key-f9">F9</div><div class="k6sde-form-key k6sde-form-key-10">F10</div><div class="k6sde-form-key k6sde-form-key-11">F11</div><div class="k6sde-form-key k6sde-form-key-12">F12</div><div class="k6sde-form-key k6sde-form-key-bt">     </div>
        <div class="k6sde-form-key k6sde-form-key-ga">\`  </div><div class="k6sde-form-key k6sde-form-key-1" >1    </div><div class="k6sde-form-key k6sde-form-key-2" >2   </div><div class="k6sde-form-key k6sde-form-key-3" >3  </div><div class="k6sde-form-key k6sde-form-key-4" >4    </div><div class="k6sde-form-key k6sde-form-key-5" >5    </div><div class="k6sde-form-key k6sde-form-key-6" >6 </div><div class="k6sde-form-key k6sde-form-key-7" >7 </div><div class="k6sde-form-key k6sde-form-key-8" >8 </div><div class="k6sde-form-key k6sde-form-key-9" >9 </div><div class="k6sde-form-key k6sde-form-key-0" >0  </div><div class="k6sde-form-key k6sde-form-key--" >-  </div><div class="k6sde-form-key k6sde-form-key-+" >+  </div><div class="k6sde-form-key k6sde-form-key-bs">Bk Sp</div>
        <div class="k6sde-form-key k6sde-form-key-ta">Tab </div><div class="k6sde-form-key k6sde-form-key-q" >Q    </div><div class="k6sde-form-key k6sde-form-key-w" >W   </div><div class="k6sde-form-key k6sde-form-key-e" >E  </div><div class="k6sde-form-key k6sde-form-key-r" >R    </div><div class="k6sde-form-key k6sde-form-key-t" >T    </div><div class="k6sde-form-key k6sde-form-key-y" >Y </div><div class="k6sde-form-key k6sde-form-key-u" >U </div><div class="k6sde-form-key k6sde-form-key-i" >I </div><div class="k6sde-form-key k6sde-form-key-o" >O </div><div class="k6sde-form-key k6sde-form-key-p" >P  </div><div class="k6sde-form-key k6sde-form-key-bo">[  </div><div class="k6sde-form-key k6sde-form-key-bc">]  </div><div class="k6sde-form-key k6sde-form-key-\" >\    </div>
        <div class="k6sde-form-key k6sde-form-key-in">Ins </div><div class="k6sde-form-key k6sde-form-key-de">Del  </div><div class="k6sde-form-key k6sde-form-key-a" >A   </div><div class="k6sde-form-key k6sde-form-key-s" >S  </div><div class="k6sde-form-key k6sde-form-key-d" >D    </div><div class="k6sde-form-key k6sde-form-key-f" >F    </div><div class="k6sde-form-key k6sde-form-key-g" >G </div><div class="k6sde-form-key k6sde-form-key-h" >H </div><div class="k6sde-form-key k6sde-form-key-j" >J </div><div class="k6sde-form-key k6sde-form-key-k" >K </div><div class="k6sde-form-key k6sde-form-key-l" >L  </div><div class="k6sde-form-key k6sde-form-key-sc">;  </div><div class="k6sde-form-key k6sde-form-key-sq">'  </div><div class="k6sde-form-key k6sde-form-key-et">Enter</div>
        <div class="k6sde-form-key k6sde-form-key-ho">Home</div><div class="k6sde-form-key k6sde-form-key-pu">Pg Up</div><div class="k6sde-form-key k6sde-form-key-bl">    </div><div class="k6sde-form-key k6sde-form-key-z" >Z  </div><div class="k6sde-form-key k6sde-form-key-x" >X    </div><div class="k6sde-form-key k6sde-form-key-c" >C    </div><div class="k6sde-form-key k6sde-form-key-v" >V </div><div class="k6sde-form-key k6sde-form-key-b" >B </div><div class="k6sde-form-key k6sde-form-key-n" >N </div><div class="k6sde-form-key k6sde-form-key-m" >M </div><div class="k6sde-form-key k6sde-form-key-co">,  </div><div class="k6sde-form-key k6sde-form-key-pe" >.  </div><div class="k6sde-form-key k6sde-form-key-sl">/ </div><div class="k6sde-form-key k6sde-form-key-up">↑   </div><div class="k6sde-form-key k6sde-form-key-br"></div>
        <div class="k6sde-form-key k6sde-form-key-ed">End </div><div class="k6sde-form-key k6sde-form-key-pd">Pg Dn</div><div class="k6sde-form-key k6sde-form-key-ct">Ctrl</div><div class="k6sde-form-key k6sde-form-key-al">Alt</div><div class="k6sde-form-key k6sde-form-key-sh">Shift</div><div class="k6sde-form-key k6sde-form-key-sp">Space</div><div class="k6sde-form-key k6sde-form-key-le">←</div><div class="k6sde-form-key k6sde-form-key-do">↓</div><div class="k6sde-form-key k6sde-form-key-ri">→</div>
      </div>
    `,
  } // view_html

} // k6sde_form
