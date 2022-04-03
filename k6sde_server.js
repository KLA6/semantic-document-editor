class k6sde_server {

  // ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== // ACTION

  async action_part_insert() {
    CL( '서버에서 데이터를 받아오고 있습니다.' )
    return await $.ajax( {
        method : 'get'
      , url    : `/sleep.php?test=8888`
      , error  : response => k6.cl( response )
      , success: response => k6.cl( response )
    } ) // ajax
  } // action_part_insert

} // k6sde_server
