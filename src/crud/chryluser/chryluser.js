export const tableOption = {
  border: true,
  selection: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '用户昵称',
    prop: 'userName',
    // type: 'select', // 选择查询框
    type: 'input', // 输入查询框
    
    search: true
  }, {
    label: '日期',
    prop: 'userDate',
    


  }]
}
