(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["group-signIn"],{4928:function(e,r,t){"use strict";var a=t("6cbd"),s=t.n(a);s.a},"54e2":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"sign-box"},[t("el-tabs",{attrs:{stretch:""},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(r){e.activeName=r},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"登录",name:"signIn"}},[t("sign-in-form",{staticClass:"form-box"})],1),t("el-tab-pane",{attrs:{label:"注册",name:"register"}},[t("sign-in-form",{staticClass:"form-box",attrs:{register:!0}})],1)],1)],1)},s=[],n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"用户名称",prop:"name"}},[t("el-input",{attrs:{placeholder:"请输入用户名称（字母数字下划线）"},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"pass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:"请输入密码（字母数字下划线）"},model:{value:e.ruleForm.pass,callback:function(r){e.$set(e.ruleForm,"pass",r)},expression:"ruleForm.pass"}})],1),e.register?t("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:"请再次输入密码（字母数字下划线）"},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1):e._e(),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("立即创建")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)},l=[],o={name:"SignInForm",props:{register:{type:Boolean,default:!1}},data:function(){var e=this,r=function(r,t,a){""===t?a(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),a())},t=function(r,t,a){""===t?a(new Error("请再次输入密码")):t!==e.ruleForm.pass?a(new Error("两次输入密码不一致!")):a()};return{ruleForm:{name:"",pass:"",checkPass:""},rules:{name:[{required:!0,message:"请输入用户名称",trigger:"blur"},{pattern:/^[a-zA-Z0-9_]+$/,message:"用户名称不合规",trigger:"change"},{min:3,max:15,message:"长度在 3 到 15 个字符",trigger:"blur"}],pass:[{required:!0,message:"请输入密码",trigger:"blur"},{min:8,max:15,message:"长度在 8 到 15 个字符",trigger:"blur"},{validator:r,trigger:"blur"},{pattern:/^[a-zA-Z0-9_]+$/,message:"密码不得含有特殊字符",trigger:"change"}],checkPass:[{required:!0,message:"请再次输入密码",trigger:"blur"},{min:8,max:15,message:"长度在 8 到 15 个字符",trigger:"blur"},{validator:t,trigger:"blur"},{pattern:/^[a-zA-Z0-9_]+$/,message:"密码不得含有特殊字符",trigger:"change"}]}}},methods:{submitForm:function(e){this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(e){this.$refs[e].resetFields()}}},i=o,m=t("2877"),u=Object(m["a"])(i,n,l,!1,null,"69480586",null),c=u.exports,g={name:"SignIn",components:{SignInForm:c},data:function(){return{activeName:"signIn"}},methods:{handleClick:function(e,r){}}},p=g,f=(t("4928"),Object(m["a"])(p,a,s,!1,null,"615f00b4",null));r["default"]=f.exports},"6cbd":function(e,r,t){}}]);
//# sourceMappingURL=group-signIn-legacy.9e14c9aa.js.map