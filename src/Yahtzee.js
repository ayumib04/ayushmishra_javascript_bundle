var Yahtzee = (function () {
    function Yahtzee(d1, d2, d3, d4, _5) {
        this.dice = null;
        this.dice = [0, 0, 0, 0, 0];
        this.dice[0] = d1;
        this.dice[1] = d2;
        this.dice[2] = d3;
        this.dice[3] = d4;
        this.dice[4] = _5;
    }
    Yahtzee.chance = function (d1, d2, d3, d4, d5) {
        var total = 0;
        total += d1;
        total += d2;
        total += d3;
        total += d4;
        total += d5;
        return total;
    };
    Yahtzee.yahtzee = function () {
        var dice = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dice[_i] = arguments[_i];
        }
        var counts = [0, 0, 0, 0, 0, 0];
        for (var index1472 = 0; index1472 < dice.length; index1472++) {
            var die = dice[index1472];
            counts[die - 1]++;
        }
        for (var i = 0; i !== 6; i++)
            if (counts[i] === 5)
                return 50;
        ;
        return 0;
    };
    Yahtzee.ones = function (d1, d2, d3, d4, d5) {
        var sum = 0;
        if (d1 === 1)
            sum++;
        if (d2 === 1)
            sum++;
        if (d3 === 1)
            sum++;
        if (d4 === 1)
            sum++;
        if (d5 === 1)
            sum++;
        return sum;
    };
    Yahtzee.twos = function (d1, d2, d3, d4, d5) {
        var sum = 0;
        if (d1 === 2)
            sum += 2;
        if (d2 === 2)
            sum += 2;
        if (d3 === 2)
            sum += 2;
        if (d4 === 2)
            sum += 2;
        if (d5 === 2)
            sum += 2;
        return sum;
    };
    Yahtzee.threes = function (d1, d2, d3, d4, d5) {
        var s;
        s = 0;
        if (d1 === 3)
            s += 3;
        if (d2 === 3)
            s += 3;
        if (d3 === 3)
            s += 3;
        if (d4 === 3)
            s += 3;
        if (d5 === 3)
            s += 3;
        return s;
    };
    Yahtzee.prototype.fours = function () {
        var sum;
        sum = 0;
        for (var at = 0; at !== 5; at++) {
            if (this.dice[at] === 4) {
                sum += 4;
            }
        }
        ;
        return sum;
    };
    Yahtzee.prototype.fives = function () {
        var s = 0;
        var i;
        for (i = 0; i < this.dice.length; i++)
            if (this.dice[i] === 5)
                s = s + 5;
        ;
        return s;
    };
    Yahtzee.prototype.sixes = function () {
        var sum = 0;
        for (var at = 0; at < this.dice.length; at++)
            if (this.dice[at] === 6)
                sum = sum + 6;
        ;
        return sum;
    };
    Yahtzee.score_pair = function (d1, d2, d3, d4, d5) {
        var counts = [0, 0, 0, 0, 0, 0];
        counts[d1 - 1]++;
        counts[d2 - 1]++;
        counts[d3 - 1]++;
        counts[d4 - 1]++;
        counts[d5 - 1]++;
        var at;
        for (at = 0; at !== 6; at++)
            if (counts[6 - at - 1] >= 2)
                return (6 - at) * 2;
        ;
        return 0;
    };
    Yahtzee.two_pair = function (d1, d2, d3, d4, d5) {
        var counts = [0, 0, 0, 0, 0, 0];
        counts[d1 - 1]++;
        counts[d2 - 1]++;
        counts[d3 - 1]++;
        counts[d4 - 1]++;
        counts[d5 - 1]++;
        var n = 0;
        var score = 0;
        for (var i = 0; i < 6; i += 1)
            if (counts[6 - i - 1] >= 2) {
                n++;
                score += (6 - i);
            }
        ;
        if (n === 2)
            return score * 2;
        else
            return 0;
    };
    Yahtzee.four_of_a_kind = function (_1, _2, d3, d4, d5) {
        var counts;
        counts = [0, 0, 0, 0, 0, 0];
        counts[_1 - 1]++;
        counts[_2 - 1]++;
        counts[d3 - 1]++;
        counts[d4 - 1]++;
        counts[d5 - 1]++;
        for (var i = 0; i < 6; i++)
            if (counts[i] >= 4)
                return (i + 1) * 4;
        ;
        return 0;
    };
    Yahtzee.three_of_a_kind = function (d1, d2, d3, d4, d5) {
        var t;
        t = [0, 0, 0, 0, 0, 0];
        t[d1 - 1]++;
        t[d2 - 1]++;
        t[d3 - 1]++;
        t[d4 - 1]++;
        t[d5 - 1]++;
        for (var i = 0; i < 6; i++)
            if (t[i] >= 3)
                return (i + 1) * 3;
        ;
        return 0;
    };
    Yahtzee.smallStraight = function (d1, d2, d3, d4, d5) {
        var counts;
        counts = [0, 0, 0, 0, 0, 0];
        counts[d1 - 1] += 1;
        counts[d2 - 1] += 1;
        counts[d3 - 1] += 1;
        counts[d4 - 1] += 1;
        counts[d5 - 1] += 1;
        if (counts[0] === 1 && counts[1] === 1 && counts[2] === 1 && counts[3] === 1 && counts[4] === 1)
            return 15;
        return 0;
    };
    Yahtzee.largeStraight = function (d1, d2, d3, d4, d5) {
        var counts;
        counts = [0, 0, 0, 0, 0, 0];
        counts[d1 - 1] += 1;
        counts[d2 - 1] += 1;
        counts[d3 - 1] += 1;
        counts[d4 - 1] += 1;
        counts[d5 - 1] += 1;
        if (counts[1] === 1 && counts[2] === 1 && counts[3] === 1 && counts[4] === 1 && counts[5] === 1)
            return 20;
        return 0;
    };
    Yahtzee.fullHouse = function (d1, d2, d3, d4, d5) {
        var counts;
        var _2 = false;
        var i;
        var _2_at = 0;
        var _3 = false;
        var _3_at = 0;
        counts = [0, 0, 0, 0, 0, 0];
        counts[d1 - 1] += 1;
        counts[d2 - 1] += 1;
        counts[d3 - 1] += 1;
        counts[d4 - 1] += 1;
        counts[d5 - 1] += 1;
        for (i = 0; i !== 6; i += 1)
            if (counts[i] === 2) {
                _2 = true;
                _2_at = i + 1;
            }
        ;
        for (i = 0; i !== 6; i += 1)
            if (counts[i] === 3) {
                _3 = true;
                _3_at = i + 1;
            }
        ;
        if (_2 && _3)
            return _2_at * 2 + _3_at * 3;
        else
            return 0;
    };
    Yahtzee.main = function (args) {
        var Score = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(20);
        var category = new Array(20);
        Score[0] = Yahtzee.chance(2, 2, 4, 2, 1);
        category[0] = "Chance";
        Score[1] = Yahtzee.yahtzee(4, 4, 4, 4, 4);
        category[1] = "Yahtzee";
        Score[2] = Yahtzee.yahtzee(1, 1, 2, 1, 1);
        category[2] = "Yahtzee";
        Score[3] = Yahtzee.ones(1, 1, 2, 1, 3);
        category[3] = "Ones";
        Score[4] = Yahtzee.ones(2, 3, 2, 5, 6);
        category[4] = "Ones";
        Score[5] = Yahtzee.twos(4, 2, 3, 2, 2);
        category[5] = "Twos";
        Score[6] = Yahtzee.twos(6, 5, 5, 5, 1);
        category[6] = "Twos";
        Score[6] = Yahtzee.score_pair(4, 2, 3, 2, 2);
        category[6] = "One Pair";
        Score[7] = Yahtzee.score_pair(6, 2, 3, 4, 1);
        category[7] = "One Pair";
        Score[8] = Yahtzee.two_pair(2, 3, 4, 3, 2);
        category[8] = "Two Pair";
        Score[9] = Yahtzee.two_pair(3, 3, 4, 5, 6);
        category[9] = "Two Pair";
        Score[10] = Yahtzee.three_of_a_kind(3, 3, 3, 4, 5);
        category[10] = "3 of a kind";
        Score[11] = Yahtzee.three_of_a_kind(3, 3, 4, 5, 6);
        category[11] = "3 of a kind";
        Score[12] = Yahtzee.four_of_a_kind(3, 3, 3, 3, 3);
        category[12] = "4 of a kind";
        Score[13] = Yahtzee.four_of_a_kind(3, 3, 4, 5, 6);
        category[13] = "4 of a kind";
        Score[14] = Yahtzee.smallStraight(1, 2, 3, 4, 5);
        category[14] = "small straight";
        Score[15] = Yahtzee.smallStraight(2, 3, 4, 5, 6);
        category[15] = "small straight";
        Score[16] = Yahtzee.largeStraight(1, 2, 3, 4, 5);
        category[16] = "large straight";
        Score[17] = Yahtzee.largeStraight(2, 3, 4, 5, 6);
        category[17] = "large straight";
        Score[18] = Yahtzee.fullHouse(1, 1, 2, 2, 2);
        category[18] = "full house";
        Score[19] = Yahtzee.fullHouse(2, 3, 4, 5, 6);
        category[19] = "full house";
        for (var i = 0; i < Score.length; i++) {
            console.info("Category: " + category[i] + " Score: " + Score[i]);
        }
        ;
    };
    return Yahtzee;
}());
Yahtzee["__class"] = "Yahtzee";
Yahtzee.main(null);