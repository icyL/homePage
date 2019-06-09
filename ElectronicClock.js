window.onload=function(){
    //设置定时器
    setInterval(currentTime,1000);//时钟
    setInterval(currentDate,1000);//日历
};

/*时钟*/
function currentTime(){
    //获取需要的标签
    var day=document.getElementsByClassName("day")[0];
    var week=document.getElementsByClassName("week")[0];
    var time=document.getElementsByClassName("time")[0];

    //获取当前时间
    var today = new Date();

    //获取当前年月日和星期
    var y = today.getFullYear();
    var m=today.getMonth()+1;//月( 0-11 ),得加上1
    var d=today.getDate();//日
    var w=today.getDay();
    var weekday; //星期几
    switch (w){
        case 0:weekday="星期日";break;
        case 1:weekday="星期一";break;
        case 2:weekday="星期二";break;
        case 3:weekday="星期三";break;
        case 4:weekday="星期四";break;
        case 5:weekday="星期五";break;
        case 6:weekday="星期六";break;
            return weekday;
    }
    //获取当前时分秒
    var mills=today.getMilliseconds();//求出总毫秒数
    var second = today.getSeconds() + parseInt(mills / 1000);//得加上已过的毫秒转的度数
    var minute = today.getMinutes() + parseInt(second / 60);//得加上已过的秒转的度数
    var hour = today.getHours() % 24 +parseInt( minute / 60);//表盘超过24点又从1开始,得加上已过的分钟转的度数

    //以两位数来显示时间
    if(hour<10){
        hour='0'+hour;
    }
    if(minute<10){
        minute='0'+minute;
    }
    if(second<10){
        second='0'+second;
    }

    //将时间插入到相应元素中
    day.innerText = y + " 年 " + m + " 月 " + d +" 日";
    week.innerText=weekday;
    time.innerText = hour + "∶" + minute + "∶" + second ;
};


/*日历
     1、判断年份是闰年还是平年，从而判断2月份是29天还是28天
     2、定义数组1~12月，每月多少天
     3、定位当前月份第一天是星期几
     4、多余部分置空
*/
function currentDate() {
    //获取需要的标签
    var eD = document.getElementsByClassName("ElectronicDate")[0];

    //声明变量ele，保存输入到div中的内容，因为直接使用innerHTML的话会覆盖之前的内容
    var ele = null;

    //获取当前年月日
    var oDate = new Date();//获取当前时间
    var year = oDate.getFullYear();  // 年
    var month = oDate.getMonth();  // 月( 0-11 )
    var date = oDate.getDate();  // 日

    // 获取当月第1天是星期几
    var firstDay = (new Date(year, month, 1)).getDay();

    // 判断是否是闰年(29) 平年(28)
    function isLeapYear() {
        if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
            return 1;
        } else {
            return 0;
        }
    }

    // 获取每个月的天数
    var monthDaysArr = [31, 28 + isLeapYear(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 计算表格行数
    var rows = Math.ceil((monthDaysArr[month] + firstDay) / 7);

    // 表头
    ele = "<table>" +
        "<tr bgcolor='blue'> <th colspan="+7+">"+year+" 年 "+(month+1)+" 月  日历表</th></tr>"+
        "<tr>" +
        "<td  bgcolor='blue'>日</td>" +
        "<td  bgcolor='blue'>一</td>" +
        "<td  bgcolor='blue'>二</td>" +
        "<td  bgcolor='blue'>三</td>" +
        "<td  bgcolor='blue'>四</td>" +
        "<td  bgcolor='blue'>五</td>" +
        "<td  bgcolor='blue'>六</td>" +
        "</tr>";

    for (var i = 0; i < rows; i++) { //表格的行
        ele = ele + "<tr>";

        // 表格每行的单元格填充
        for (var j = 0; j < 7; j++) {

            // 单元格自然序列号
            tdIndex = i * 7 + j;

            // 计算日期
            fillDate = tdIndex - firstDay + 1;

            // 过滤无效日期（小于等于零的、大于月总天数的）
            if (fillDate <= 0 || fillDate > monthDaysArr[month]) {
                fillDate = "&nbsp;";
            } else {
                fillDate = tdIndex - firstDay + 1;
            }

            // 打印日期，并把今天底色设为红色
            if (fillDate == date) {
                ele = ele + "<td  bgcolor='red'>" + fillDate + "</td>";
            } else {
                ele = ele + "<td >" + fillDate + "</td>";
            }
        }

        ele = ele + "</tr>"; //表格的行结束
    }
    ele = ele + "</table>"; // 表格结束

    eD.innerHTML = ele;//由于innerHTML会覆盖之前的内容，所以由ele赋值给它插入到元素中
}