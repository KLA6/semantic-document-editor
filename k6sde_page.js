class k6sde_page extends k6sde_parent {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // INIT

  init_view() {
    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- // HTML
    $( `#${this.parent.config.id_elem} .k6sde-page` ).append() // 투두 // 페이지 로드
  } // init_view

  init_event() {
  } // init_event

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // VIEW

  view_icon = {
  } // view_icon

  view_html = {
  } // view_html

} // k6sde_page
