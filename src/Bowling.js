var Bowling = (function () {
    function Bowling() {
    }
    Bowling.returnInt = function (x) {
        if (x.indexOf("-") != -1)
            return parseInt((x.replace(new RegExp("-", 'g'), "")));
        else {
            var twos = x.split("");
            if (twos.length > 1)
                return (parseInt(twos[0].toString()) + parseInt(twos[1].toString()));
            else
                return (parseInt(twos[0].toString()));
        }
    };
    Bowling.main = function (args) {
        var line = "X X X X X X X X 9/ 9/ X";
        var linearr = line.split(" ");
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            if (linearr[i].toString().indexOf("X") != -1) {
                if (linearr[i + 1].toString().indexOf("X") != -1) {
                    if (linearr[i + 2].toString().indexOf("X") != -1) {
                        sum = sum + 30;
                    }
                    else if (linearr[i + 2].toString().indexOf("/") != -1) {
                        sum = sum + 20 + parseInt(linearr[i + 2].toString().split("")[0]);
                    }
                }
                else if (linearr[i + 1].toString().indexOf("/") != -1) {
                    sum = sum + 20;
                }
                else
                    sum = sum + 10 + Bowling.returnInt(linearr[i + 1].toString());
            }
            else if (linearr[i].toString().indexOf("/") != -1) {
                if (linearr[i + 1].toString().indexOf("X") != -1) {
                    sum = sum + 20;
                }
                else if (linearr[i + 1].toString().indexOf("/") != -1) {
                    sum = sum + 10 + parseInt(linearr[i + 1].toString().split("")[0]);
                }
                else
                    sum = sum + 10 + Bowling.returnInt(linearr[i + 1].toString());
            }
            else if (!(linearr[i].toString().indexOf("X") != -1 || linearr[i].toString().indexOf("/") != -1))
                sum = sum + Bowling.returnInt(linearr[i].toString());
        }
        console.info("Sum: " + sum);
    };
    return Bowling;
}());
Bowling["__class"] = "Bowling";
Bowling.main(null);