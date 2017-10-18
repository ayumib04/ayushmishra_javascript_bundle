var PokerHands = (function () {
    function PokerHands(arr) {
        /*private*/ this.rank = 0;
        this.hand = null;
        this.hand = new Array(5);
        this.hand[0] = arr[0];
        this.hand[1] = arr[1];
        this.hand[2] = arr[2];
        this.hand[3] = arr[3];
        this.hand[4] = arr[4];
        this.Ranker();
    }
    PokerHands.prototype.getRank = function () {
        return this.rank;
    };
    PokerHands.getVal = function (hand) {
      if(typeof hand != 'string') return;
        var temp = hand.split("")[0];
        if (temp == "J")
            return 11;
        else if (temp == "Q")
            return 12;
        else if (temp == "K")
            return 13;
        else if (temp == "A")
            return 14;
        else
            return parseInt(temp);
    };
    PokerHands.prototype.getSuit = function (hand) {
        return hand.split("")[1];
    };
    /*private*/ PokerHands.prototype.sort = function (hands) {
        var temp;
        var minidx;
        for (var i = 0; i < hands.length; i++) {
            minidx = i;
            for (var j = 0; j < hands.length; j++) {
                if (PokerHands.getVal(hands[minidx]) > PokerHands.getVal(hands[j]))
                    minidx = j;
            }
            temp = hands[minidx];
            hands[minidx] = hands[i];
            hands[i] = temp;
        }
    };
    /*private*/ PokerHands.prototype.ispair = function (hands) {
        var pairidx = -1;
        for (var i = 0; i < 4; i++)
            if (PokerHands.getVal(hands[i]) === PokerHands.getVal(hands[i + 1])) {
                pairidx = i;
                this.rank = 1;
                i = 4;
            }
        return pairidx;
    };
    /*private*/ PokerHands.prototype.ispair2nd = function (hands, pairidx) {
        if (this.rank === 1) {
            for (var i = pairidx + 2; i < 4; i++)
                if (PokerHands.getVal(hands[i]) === PokerHands.getVal(hands[i + 1]))
                    this.rank = 2;
        }
    };
    /*private*/ PokerHands.prototype.is3ofakindorfullhouse = function (hands) {
        for (var i = 0; i < 3; i++)
            if (PokerHands.getVal(hands[i]) === PokerHands.getVal(hands[i + 1]) && PokerHands.getVal(hands[i + 1]) === PokerHands.getVal(hands[i + 2])) {
                this.rank = 3;
                if (i === 0 && PokerHands.getVal(hands[3]) === PokerHands.getVal(hands[4]) || i === 2 && PokerHands.getVal(hands[0]) === PokerHands.getVal(hands[1]))
                    this.rank = 6;
            }
    };
    /*private*/ PokerHands.prototype.is4ofakind = function (hands) {
        for (var i = 0; i < 2; i++)
            if (PokerHands.getVal(hands[i]) === PokerHands.getVal(hands[i + 1]) && PokerHands.getVal(hands[i + 1]) === PokerHands.getVal(hands[i + 2]) && PokerHands.getVal(hands[i + 2]) === PokerHands.getVal(hands[i + 3]))
                this.rank = 7;
    };
    /*private*/ PokerHands.prototype.isstraight = function (hands) {
        if (this.rank === 0)
            if ((PokerHands.getVal(hands[4]) - PokerHands.getVal(hands[0]) === 4) || (PokerHands.getVal(hands[3]) - PokerHands.getVal(hands[0]) === 3 && PokerHands.getVal(hands[4]) === 14 && PokerHands.getVal(hands[0]) === 2)) {
                this.rank = 4;
            }
    };
    /*private*/ PokerHands.prototype.isflush = function (hands) {
        var flush = 1;
        if (this.rank === 0 || this.rank === 4) {
            for (var i = 0; i < 4; i++)
                if (!(function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(this.getSuit(hands[i]), this.getSuit(hands[i + 1])))
                    flush = 0;
            if (flush === 1 && this.rank === 4)
                this.rank = 8;
            else if (flush === 1)
                this.rank = 5;
        }
    };
    /*private*/ PokerHands.prototype.Ranker = function () {
        var sorted = new Array(5);
        for (var i = 0; i < 5; i++)
            sorted[i] = this.hand[i];
        this.sort(sorted);
        var pairidx = -1;
        pairidx = this.ispair(sorted);
        this.ispair2nd(sorted, pairidx);
        this.is3ofakindorfullhouse(sorted);
        this.is4ofakind(sorted);
        this.isstraight(sorted);
        this.isflush(sorted);
    };
    PokerHands.sorter = function (hands) {
        var temp;
        var minidx;
        for (var i = 0; i < hands.length; i++) {
            minidx = i;
            for (var j = 0; j < hands.length; j++) {
                if (PokerHands.getVal(hands[minidx]) > PokerHands.getVal(hands[j]))
                    minidx = j;
            }
            temp = hands[minidx];
            hands[minidx] = hands[i];
            hands[i] = temp;
        }
        return hands;
    };
    PokerHands.highestval = function (hands1, hands2) {
        hands1 = PokerHands.sorter(hands1);
        hands2 = PokerHands.sorter(hands2);
        var idx = -1;
        for (var i = 4; i >= 0; i--) {
            if (PokerHands.getVal(hands1[i]) !== PokerHands.getVal(hands2[i])) {
                idx = i;
                break;
            }
        }
        if (idx === -1)
            console.info("Tie.");
        else if (PokerHands.getVal(hands1[idx]) > PokerHands.getVal(hands2[idx]))
            console.info("Black wins. - with High Card " + hands1[idx].toString());
        else
            console.info("White wins. - with High Card " + hands2[idx].toString());
    };
    PokerHands.ranktoString = function (rank) {
        var result = "";
        switch ((rank)) {
            case 0:
                result = "noRank";
                break;
            case 1:
                result = "Pair";
                break;
            case 2:
                result = "TwoPairs";
                break;
            case 3:
                result = "3 of a kind";
                break;
            case 4:
                result = "Straight";
                break;
            case 5:
                result = "Flush";
                break;
            case 6:
                result = "Full House";
                break;
            case 7:
                result = "4 of a Kind";
                break;
            case 8:
                result = "Straight Flush";
                break;
            default:
                break;
        }
        return result;
    };
    PokerHands.main = function (args) {
        var h1;
        var h2;
        h1 = new PokerHands("2H 3D 5S 9C KD".split(" "));
        h1.Ranker();
        h2 = new PokerHands("2C 3H 4S 8C KH".split(" "));
        h2.Ranker();
        if (h1.getRank() > h2.getRank())
            console.info("Black wins. - with " + PokerHands.ranktoString(h1.getRank()));
        else if (h1.getRank() < h2.getRank())
            console.info("White wins. - with " + PokerHands.ranktoString(h2.getRank()));
        else if (h1.getRank() === h2.getRank())
            PokerHands.highestval("2H 3D 5S 9C KD".split(" "), "2C 3H 4S 8C KH".split(" "));
    };
    return PokerHands;
}());
PokerHands["__class"] = "PokerHands";
PokerHands.main(null);
