<template>
<div>
    <br>
    <center>
        <h2 class="title">Timer</h2>
    </center>
    <br>
    <div class="container">
        <div class="column is-three-fifths is-offset-one-fifth timer">
            <div class="timer-input">
                <input type="number" v-model="inputDuration" placeholder="Seconds" />
                <button @click="startTimer" :disabled="timerRunning">Start</button>
                <button v-if="pauseShow == 1" @click="pauseResumeTimer" :disabled="!timerRunning">
                    <b-icon icon="pause" size="is-small"></b-icon>
                </button>
                <button v-if="pauseShow == 2" @click="play">
                    <b-icon icon="play" size="is-small"></b-icon>
                </button>
                <button @click="resetTimer">Restart</button>

            </div>
            <div class="timer-display timer-flex" v-if="timerRunning">
                <span>{{ formatTime(hours) }}</span> :
                <span>{{ formatTime(minutes) }}</span> :
                <span>{{ formatTime(seconds) }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            inputDuration: "",
            timerRunning: false,
            timer: null,
            totalSeconds: 0,
            remainingSeconds: 0,
            pauseShow: 0,
        };
    },
    computed: {
        hours() {
            return Math.floor(this.remainingSeconds / 3600);
        },
        minutes() {
            return Math.floor((this.remainingSeconds % 3600) / 60);
        },
        seconds() {
            return this.remainingSeconds % 60;
        }
    },
    methods: {
        startTimer() {
            const inputDuration = parseInt(this.inputDuration);
            if (isNaN(inputDuration) || inputDuration <= 0) {
                this.$buefy.toast.open({
                    message: 'Please enter a valid numeric value greater than zero',
                    type: 'is-danger'
                });
                return;
            }

            if (!this.timerRunning) {
                this.totalSeconds = inputDuration;
                this.remainingSeconds = inputDuration;
            }

            this.timerRunning = true;

            this.timer = setInterval(() => {
                if (this.remainingSeconds > 0) {
                    this.remainingSeconds--;
                } else {
                    this.stopTimer();
                    this.$buefy.toast.open({
                        message: 'The timer has expired!',
                        type: 'is-success'
                    });
                }
            }, 1000);
            this.pauseShow = 1;
            this.$emit('timer-started');
        },
        pauseResumeTimer() {
            if (this.timerRunning) {
                clearInterval(this.timer);
                this.timerRunning = true;
                this.$emit('timer-paused');
            } else {
                this.timerRunning = true;

                this.timer = setInterval(() => {
                    if (this.remainingSeconds > 0) {
                        this.remainingSeconds--;
                    } else {
                        this.stopTimer();
                        this.$buefy.toast.open({
                            message: 'The timer has expired!',
                            type: 'is-success'
                        });
                    }
                }, 1000);
                this.$emit('timer-resumed');
            }
            this.pauseShow = 2
        },
        resetTimer() {
            this.inputDuration = 0;
            clearInterval(this.timer);
            this.timer = null;
            this.timerRunning = false;
            this.totalSeconds = 0;
            this.remainingSeconds = 0;
            this.pauseShow = 0
            this.$emit('timer-reset');
        },
        stopTimer() {
            clearInterval(this.timer);
            this.timer = null;
            this.timerRunning = false;
        },
        play() {
            this.timer = setInterval(() => {
                if (this.remainingSeconds > 0) {
                    this.remainingSeconds--;
                } else {
                    this.stopTimer();
                    this.$buefy.toast.open({
                        message: '¡El temporizador ha terminado!',
                        type: 'is-success'
                    });
                }
            }, 1000);
            this.$emit('timer-resumed');
            this.pauseShow = 1
        },
        formatTime(value) {
            return value.toString().padStart(2, '0');
        }
    },
    beforeDestroy() {
        this.stopTimer();
    }
};
</script>

<style scoped>
.timer {
    display: grid;
    justify-content: center;
}

.timer-flex {
    display: flex;
    justify-content: center;
}

.timer-input {
    margin-bottom: 20px;
}

.timer-input input {
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.timer-input button {
    margin-left: 10px;
    padding: 8px 12px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.timer-input button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.timer-display {
    font-size: 36px;
    font-weight: bold;
}
</style>
