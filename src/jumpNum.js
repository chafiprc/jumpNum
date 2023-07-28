(function () {
  let jumpNum = {
    tag: "jumpNum", //html标签名称
    speed: 50, //刷新速度
    minTime: 500, //最小显示时间
    maxTime: 5000, //最大显示时间
    maxTimeOut: 500, //获取数字的最大超时时间
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    getNum: function (eachJNE) {
      // 获取数字
      let getNumTimes = 0;
      let attemptTime = ~~(jumpNum.maxTimeOut / jumpNum.speed);
      while (getNumTimes <= attemptTime) {
        if (
          !isNaN(Number(eachJNE.innerText)) &&
          Number(eachJNE.innerText) !== 0
        ) {
          return Number(eachJNE.innerText);
        }
        jumpNum.sleep(jumpNum.speed);
        getNumTimes++;
      }
      throw "Can't get number.";
    },
    executeJumpNum: async function (eachJNE, duration) {
      //异步执行
      let num = Number(); // 显示的数
      let step = Number(); //步长
      let temp = Number(); //每一步执行后的数
      let times = ~~(duration / jumpNum.speed); //次数
      try {
        num = jumpNum.getNum(eachJNE);
        temp = 0;
        eachJNE.innerText = String(temp);
        if (Number.isInteger(num)) {
          //整数判断
          step = ~~(num / times);
          for (let i = 0; i < times; i++) {
            temp += step;
            step = ~~((num - temp) / (times - i - 1)); //更新步长，使步长更为均匀
            await jumpNum.sleep(jumpNum.speed);
            eachJNE.innerText = String(temp);
          }
          await jumpNum.sleep(jumpNum.speed);
          eachJNE.innerText = String(num);
        } else {
          //小数判断
          let intNum = Math.trunc(num);
          let intNumLen = String(intNum).length;
          let decNum = Number(String(num).slice(intNumLen + 1));
          let decNumLen = String(decNum).length;
          let intTimes = ~~((times * intNumLen) / (intNumLen + decNumLen));
          let decTimes = times - intTimes;
          step = ~~(intNum / intTimes);
          for (let i = 0; i < intTimes; i++) {
            temp += step;
            step = ~~((intNum - temp) / (intTimes - i - 1)); //更新步长，使步长更为均匀
            await jumpNum.sleep(jumpNum.speed);
            eachJNE.innerText = String(temp);
            console.log(eachJNE.innerText);
          }
          let decTemp = 0;
          temp = intNum;
          step = ~~(decNum / decTimes);
          for (let i = 0; i < decTimes; i++) {
            decTemp += step;
            temp = Number(String(intNum) + "." + String(decTemp));
            step = ~~((decNum - decTemp) / (decTimes - i - 1)); //更新步长，使步长更为均匀
            await jumpNum.sleep(jumpNum.speed);
            eachJNE.innerText = String(temp);
            console.log(eachJNE.innerText);
          }
          await jumpNum.sleep(jumpNum.speed);
          eachJNE.innerText = String(num);
        }
      } catch (value) {
        console.log(value);
      }
    },
    init: function () {
      // 初始化函数
      let allEle = $(jumpNum.tag); // 获取所有jumpNum标签元素
      for (let eachJNE of allEle) {
        let duration = Number();
        try {
          //设置持续时间
          duration = Number(eachJNE.getAttribute("duration"));
          if (duration < jumpNum.minTime && duration > 0) {
            duration = jumpNum.minTime;
          } else if (duration > jumpNum.maxTime) {
            duration = jumpNum.maxTime;
          } else if (
            duration >= jumpNum.minTime &&
            duration <= jumpNum.maxTime
          ) {
            duration = duration;
          } else {
            duration = 2000; // 默认持续时间
          }
          if (isNaN(duration)) {
            throw "Not a Number, set to default.";
          }
        } catch {
          duration = 2000;
        }
        let type = String(); //设置显示类型
        type = String(eachJNE.getAttribute("type"));
        if (type !== "hover") {
          jumpNum.executeJumpNum(eachJNE, duration);
        } else {
          $(eachJNE).mouseover(function () {
            jumpNum.executeJumpNum(eachJNE, duration);
            $(eachJNE).off(); //移除选择器，使数字仅变化一次
          });
        }
      }
    },
  };
  jumpNum.init();
})();
