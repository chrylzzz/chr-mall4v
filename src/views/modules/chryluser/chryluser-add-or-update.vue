<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
     
      <el-form-item label="用户昵称"
                    prop="userName">
        <el-input v-model="dataForm.userName"
                  :disabled="!dataForm.id ? false : true"
                  placeholder="用户昵称"
                  ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.userPassword" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="时间"
                    prop="userDate">
        <!--      文本框的大小
                    size="mini"
              :disabled="true"  是否可操作
          
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group> 
        
        -->
                <el-date-picker v-model="dataForm.userDate">

                </el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
          var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.userPassword !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
    return {
      visible: false,
      dataForm: {
        id: 0,
        userName:'',
        userDate:'',
        userPassword: '',
        comfirmPassword: '',
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      dataRule: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        userPassword: [
            { validator: validatePassword, trigger: 'blur' }
        ],
        comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.adornUrl(`/chryluser/chryluser/info/${this.dataForm.id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          // this.dataForm = data// 全部映射到dataForm中,如果有密码等不需要被展示的,请自行赋值
              this.dataForm.userName = data.userName
              this.dataForm.userDate = data.userDate
        })
      }
    },
    // 表单提交
    dataFormSubmit () {
      
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/chryluser/chryluser`),
            method: this.dataForm.id ? 'put' : 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'userName':this.dataForm.userName,
              'userDate': this.dataForm.userDate,
              'userPassword':this.dataForm.userPassword,
            })
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                // this.$emit('refreshDataList', this.page)
                this.$emit('refreshDataList')
              }
            })
          })
        }
      })
    }
  }
}
</script>
