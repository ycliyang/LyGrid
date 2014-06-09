var showTeacherKqList={};
$(document).ready(function() {


    var userStatus=new lygMap();
    userStatus.put("1",'<span style="color: #0000ff">正常</span>');
    userStatus.put("2",'<span style="color: #ff0000">迟到</span>');
    userStatus.put("4",'<span style="color: #000000">出差</span>');
    userStatus.put("5",'<span style="color: #c77405">事假</span>');
    userStatus.put("3",'<span style="color: #ff0000">未进校</span>');
    userStatus.put("6",'<span style="color: #387038">病假</span>');
    userStatus.put("0","尚未生成");

    function  userStatusFilter2Value(value){
        return userStatus.findFirstKeyByValue(value)
    }

    function  userStatusFilter(key){
        return userStatus.getK(key+"");
    }

    function editUserStatus(rowData,key){
        var se = "<select>" +
            "<option value='1'>正常</option>" +
            "<option value='2'>迟到</option>" +
            "<option value='4'>出差</option>" +
            "<option value='5'>事假</option>" +
            "<option value='6'>病假</option>" +
            "<option value='3'>未进校</option>" +
            "<option value='0'>尚未生成</option>" +
            "</select>";
        return se;
    }


    if(typeof spaceUrl == 'undefined'){
        spaceUrl="../../../";
    }

    function createCell(headerText,dataIndexStr){
        var t = createDay(headerText);
        return {header:headerText+"号 "+t,dataIndex:dataIndexStr,type:"String",width:"90px",sort:true,renderder:userStatusFilter,edit:true,editModel:{type:"select",createNode:editUserStatus},getValue:userStatusFilter2Value};
    }

    function createDay(day){
        var year = $("#showYear").html();
        var month = $("#showMonth").html();

        if(year==""||month==""||year=="0"||month=="0"){
            d = new Date();
            return Ly.date.getWeekDay(new Date(d.getFullYear(), d.getMonth(),day));
        }else {
            return Ly.date.getWeekDay(new Date(year,month-1,day));
        }
    }
    var columns =new Array();
    function createDayColumns(){
        var year = $("#showYear").html();
        var month = $("#showMonth").html();

        var d ;
        if(year==""||month==""||year=="0"||month=="0"){
            d = new Date();
        }else {
            d = new Date(year,month-1,1);
        }
        var lastDay = Ly.date.getCurrentMonthLastDay(d);


        columns = new Array();
        for(var i=1;i<=lastDay;i++){
           if(i%7==0){
               columns.push({header:"用户名",dataIndex:"name",type:"String",width:"80px",sort:true,css:"userNameFixed"});
           }else {
               columns.push(createCell(i,"z"+i));
           }
        }
    }

    function createGrid(){

        createDayColumns();
        return new Ly.LyGrid({
            name:"showTeacherKqList",
            id:"showTeacherKqList",
            width:'100%',
            height:'500px',
            tableWidth:"3500px",
            div:"showTeacherKqList",
            //json:json,
            edit:true,
    //        sm:{
    //            checkBox:true,
    //            rowNumber:{
    //                header:"行号"
    //            }
    //
    //        },
            columns:columns,
            actions:{
                post:"json",
                read:spaceUrl+"st/userAttendance/readPageForInRowMonth.do",
                update:spaceUrl+"st/userAttendance/updateUserInStatusByDate.do",
                onUpdate:function (updateObjArray,updateCellObjArray){
    //                console.log("--->");
                    var updateArray = new Array();
                    var len=0;
                    for(var i = 0;i<updateObjArray.size();i++){
                        var uo = updateObjArray.value[i];
                        var uc = updateCellObjArray.value[i];
                        var keys = uc.key;
                        for(var j=0;j<keys.length;j++){
                            len++;
                            var key = keys[j];
                            var str = new String("userId="+uo.getK('userId'));
                            str+="&inStatus="+uc.getK(key);
                            str+="&year="+uo.getK('year');
                            str+="&month="+uo.getK('month');
                            str+="&day="+key.substring(1,key.length);
                            var url = this.update;
                            (function (){
                                var id = updateObjArray.key[i];
                                var name = key;
                                Ly.util.post(url,str,function (json){
                                    if(json.success==true){
                                        showTeacherKqList.cellSaveSuccess(id,name);
    //                                    len--;
    //                                    if(len==0){
    //                                        alert("数据保存成功！");
    //                                        $("#queryBtn").click();
    //                                    }
                                    }
                                });
                            })();
                        }
                    }
                }
            },
            pageToolbar:new Ly.LyPageToolbar({
                id:"showTeacherKqListGridPageToolbar",
                df:{
                    pageSize:200
                },
                autoLoad:false,
                listener:{
                    refreshPage:function (json){
                        document.showTeacherKqForm.queryYear.value=json.nowYear;
                        document.showTeacherKqForm.queryMonth.value=json.nowMonth;
                        if(json.clean){
                            document.showTeacherKqForm.nowYear.value=json.nowYear;
                            document.showTeacherKqForm.nowMonth.value=json.nowMonth;
                        }

                        createMonthDay(json.nowYear,json.nowMonth,Ly.date.daysOfMonth(json.nowYear+""+json.nowMonth));

                        $("#showYear").html(json.nowYear);
                        $("#showMonth").html(json.nowMonth);
                    }
                }
            })
        });
    }

    $("#showSchoolDetailList_add").bind("click",function (){
        showTeacherKqList.addRow();
    });

    $("#showSchoolDetailList_delete").bind("click",function (){
        showTeacherKqList.removeRows();
    });

    $("#showSchoolDetailList_sync").bind("click",function (){
        showTeacherKqList.sync();
    });

    function queryForm2Params(){
        var urlParams =new String("");
        urlParams += "type="+document.showTeacherKqForm.type.value;
        urlParams += "&status="+document.showTeacherKqForm.infoStatus.value;
//        urlParams += "&inStatus="+document.showTeacherKqForm.inStatus.value;
        urlParams += "&year="+document.showTeacherKqForm.queryYear.value;
        urlParams += "&month="+document.showTeacherKqForm.queryMonth.value;
        return urlParams;
    }

    function queryFormEmpty(){
        document.showTeacherKqForm.type.valu=0;
        document.showTeacherKqForm.infoStatus.valu=0;
//        document.showTeacherKqForm.inStatus.valu=0;
//        document.showTeacherKqForm.outStatus.valu=0;
    }

    function query(){
        $("#showMonth").html(document.showTeacherKqForm.queryMonth.value);
        $("#showYear").html(document.showTeacherKqForm.queryYear.value);
        $("#showTeacherKqList").html("");
        $("#showTeacherKqList").attr("class","");
        showTeacherKqList = createGrid();
        showTeacherKqList.getPageToolbar().extra = queryForm2Params();
        showTeacherKqList.getPageToolbar().btn.refreshPage.onclick();
    }

    //查询当前周
    $("#nowMonth").bind("click",function(){
        document.showTeacherKqForm.queryMonth.value = 0;
        query();
    });

    //查询上一月
    $("#lastMonth").bind("click",function(){
//        if(document.showTeacherKqForm.queryWeek.value<document.showTeacherKqForm.nowWeek.value){
        if( document.showTeacherKqForm.queryMonth.value==1){
            document.showTeacherKqForm.queryMonth.value=13;
            document.showTeacherKqForm.queryYear.value--;
        }
        document.showTeacherKqForm.queryMonth.value--;
        query();
//        }
    });

    //查询下一月
    $("#nextMonth").bind("click",function(){
        if(document.showTeacherKqForm.queryMonth.value<document.showTeacherKqForm.nowMonth.value||document.showTeacherKqForm.queryYear.value<document.showTeacherKqForm.nowYear.value){
            if( document.showTeacherKqForm.queryMonth.value==12){
                document.showTeacherKqForm.queryMonth.value=0;
                document.showTeacherKqForm.queryYear.value++;
            }
            document.showTeacherKqForm.queryMonth.value++;
            query();
        }
    });

    $("#queryBtn").bind("click",function(){
        query();
    });

    $("#queryCancelBtn").bind("click",function (){
        queryFormEmpty();
    });

    $("#nowMonth").click();

    $("#syncBtn").bind("click",function (){
        if(confirm("确定保存修改的数据吗？")){
            showTeacherKqList.sync();
        }
    });

    $("#createTeacherInBtn").bind("click",function (){
        if(confirm("确定统计今天的进校情况？")){
            createTodayInStatus(0);
        }
    });


    function createWhereDayInStatus(st,dateNumber){
        $("#createTeacherInWhereDayBtn").html("正在统计指定日期进出记录......");
        $("#createTeacherInWhereDayBtn").attr("disabled",true);
        Ly.util.post(spaceUrl+"st/userAttendance/createWhereDayInStatus.do","status="+st+"&date="+dateNumber,function (json){
            if(json.success){
                alert("进校记录统计成功！");
            }else{
                if(json.status&&json.status==1){
                    if(confirm("您选择进校信息已经统计过了,是否要重新统计？")){
                        createWhereDayInStatus(1,dateNumber);
                        return ;
                    }
                }else if(json.status&&json.status==2){
                    if(confirm("系统检测要统计的日期是假日，是否要强制统计今天进校情况？")){
                        createWhereDayInStatus(1,dateNumber);
                        return ;
                    }
                }else{
                    alert("系统忙！");
                }
            }
            $("#createTeacherInWhereDayBtn").html("统计指定日期进行记录");
            $("#createTeacherInWhereDayBtn").attr("disabled",false);
        });
    }

    function createTodayInStatus(st){
        $("#createTeacherInBtn").html("今天进校记录正在统计中......");
        $("#createTeacherInBtn").attr("disabled",true);
        Ly.util.post(spaceUrl+"st/userAttendance/createTodayInStatus.do","status="+st,function (json){
            if(json.success){
                alert("今天进校记录统计成功！");
            }else{
                if(json.status&&json.status==1){
                    if(confirm("今天的进校信息已经统计过了,是否要重新统计？")){
                        createTodayInStatus(1);
                        return ;
                    }
                    return ;
                }else if(json.status&&json.status==2){
                    if(confirm("系统检测到今天是假日，是否要强制统计今天进校情况？")){
                        createTodayInStatus(1);
                        return ;
                    }
                }else{
                    alert("系统忙！");
                }
            }
            $("#createTeacherInBtn").html("统计今天进校记录");
            $("#createTeacherInBtn").attr("disabled",false);
        });
    }

    $("#createTeacherInWhereDayBtn").bind("click",function (){
        var ds= $("#dayOfMonth").val().split("-");
        createWhereDayInStatus(0,new Date(ds[0],ds[1]-1,ds[2]).getTime());
    });

    function createMonthDay (year,month,days){
        $("#dayOfMonth").html("");
        for(var i=1;i<=days;i++){
            var d = year+"-"+month+"-"+i;
            if(new Date(year,month-1,i).getTime()<new Date().getTime()){
                $("#dayOfMonth").append("<option value='"+d+"'>"+d+"</option>");
            }
        }
    }

    var date = new Date();
    var d = date.getFullYear()+""+(date.getMonth()+1);

    createMonthDay(date.getFullYear(),date.getMonth()+1,Ly.date.daysOfMonth(d));

});
