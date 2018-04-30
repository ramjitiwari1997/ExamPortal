var object={
loginObj:function(id,password){
    this.id=id;
    this.password=password;
},
teacherObj:function(form){
    this.name=form.name;
    this.dept=form.dept;
    this.id=form.id;
    this.mail=form.mail;
    this.mob=form.mob;
    this.password=form.pwd;
    this.Tests=[];
},

}
module.exports=object;