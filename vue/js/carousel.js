var vm = new Vue({
    el: '.carousel',
    data: {
        src: [],
        showState: [],
        isAuto:true,
        timer:null,
        num: 5//需要加载的图片个数
    },
    created: function () {
        for (let i = 0; i < this.num; i++) {
            let html = `url(images/banner_${i + 1}.jpg) center top no-repeat`;
            this.src.push(html);
            if (i === 0) {
                this.showState.push(true);
            } else {
                this.showState.push(false);
            }
        }
        this.timer=setInterval(this.showNext, 3000);
    },
    watch:{
        isAuto:function () {
            clearInterval(this.timer);
            if(!this.isAuto){return false;}
            this.timer=setInterval(this.showNext, 3000);
        }
    },
    updated:function () {
        this.isAuto=true;
    },
    methods: {
        hoverEnter:function () {
            this.isAuto=false
        },
        hoverLeave:function () {
            this.isAuto=true
        },
        showCur: function (idx) {
            this.isAuto=false;
            for (let i = 0; i < this.showState.length; i++) {
                this.$set(this.showState, i, false);
            }
            this.$set(this.showState, idx, true);
        },
        showNext: function () {
            this.isAuto=false;
            let idx = 0;
            for (let i = 0; i < this.showState.length; i++) {
                if (this.showState[i] === true) {
                    idx = i;
                }
                this.$set(this.showState, i, false);
            }
            if (idx == this.showState.length - 1) {
                idx = -1;
            }
            this.$set(this.showState, idx + 1, true);
        },
        showPrev: function () {
            this.isAuto=false;
            let idx = 0;
            for (let i = 0; i < this.showState.length; i++) {
                if (this.showState[i] === true) {
                    idx = i;
                }
                this.$set(this.showState, i, false);
            }
            if (idx === 0) {
                idx = this.showState.length;
            }
            this.$set(this.showState, idx - 1, true);
        }
    }
});
