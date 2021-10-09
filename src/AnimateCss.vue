<template>
    <transition
        :mode="mode"
        :enter-class="enterClass"
        :enter-to-class="enterToClass"
        :enter-active-class="enterActiveClassName"
        :leave-class="leaveClass"
        :leave-to-class="leaveToClass"
        :leave-active-class="leaveActiveClassName"
        @before-enter="(...args) => this.$emit('before-enter', ...args)"
        @enter="(...args) => this.$emit('enter', ...args)"
        @after-enter="(...args) => this.$emit('after-enter', ...args)"
        @before-leave="(...args) => this.$emit('before-leave', ...args)"
        @leave="(...args) => this.$emit('leave', ...args)"
        @after-leave="(...args) => this.$emit('after-leave', ...args)">
        <slot />
    </transition>
</template>

<script>
import 'animate.css';
import { camelCase } from '@vue-interface/utils';

export default {

    props: {

        animated: {
            type: Boolean,
            default: true
        },

        attentionSeekerEffects: {
            type: Array,
            default: () => ([
                'bounce',
                'flash',
                'pulse',
                'rubberBand',
                'shakeX',
                'shakeY',
                'headShake',
                'swing',
                'tada',
                'wobble',
                'jello',
                'heartBeat',
            ])
        },

        big: Boolean,

        delay: [String, Number, Function],

        direction: {
            type: String,
            default() {
                return (
                    this.x && 'x' ||
                    this.y && 'y' ||
                    this.up && 'up' ||
                    this.down && 'down' ||
                    this.left && 'left' ||
                    this.right && 'right'
                ) || undefined;
            },
            validate(value) {
                return ['up', 'down', 'left', 'right'].indexOf(value.toLowerCase()) !== -1;
            }
        },

        directionEffects: {
            type: Array,
            default: () => ([
                'back',
                'bounce',
                'fade',
                'flip',
                'lightspeed',
                'rotate',
                'roll',
                'slide',
                'zoom'
            ])
        },

        down: Boolean,

        duration: [String, Number, Function],

        enter: String,

        enterClass: String,

        enterToClass: String,

        enterActiveClass: String,

        inOut: Boolean,

        leave: String,
        
        leaveClass: String,

        leaveToClass: String,

        leaveActiveClass: String,

        left: Boolean,
        
        mode: String,

        name: String,

        prefix: {
            type: String,
            default: 'animate__'
        },

        right: Boolean,

        special: {
            type: Boolean,
            default() {
                return this.name && (
                    !this.inOut && this.attentionSeekerEffects.indexOf(this.name.toLowerCase()) > -1
                    || this.directionEffects.indexOf(this.name.toLowerCase()) === -1
                );
            }
        },

        up: Boolean,

        x: Boolean,

        y: Boolean

    },

    computed: {

        animatedClassName() {
            return this.animated ? this.applyPrefix('animated') : '';
        },

        enterActiveClassName() {
            return this.enter
                ? `${this.applyPrefix(this.enter)} ${this.animatedClassName}`
                : this.activeClass('in', this.enterActiveClass);
        },

        leaveActiveClassName() {
            return this.leave 
                ? `${this.applyPrefix(this.leave)} ${this.animatedClassName}`
                : this.activeClass('out', this.leaveActiveClass);
        }

    },

    updated() {
        if(this.$slots.default && this.$slots.default.length) {
            const [{ elm }] = this.$slots.default;

            for(let attr of ['duration', 'delay']) {
                const value = this[attr] instanceof Function
                    ? this[attr]()
                    : this[attr];
                
                elm.style[camelCase(`animation_${attr}`)] = value;
            }
        }
    },

    methods: {

        activeClass(key, ...classes) {
            return [
                this.applyPrefix(
                    camelCase([
                        this.name,
                        !this.special && key,
                        !this.special && this.direction,
                        !this.special && this.big && 'big'
                    ].filter(value => !!value).join(' '))
                )
            ]
                .concat([this.animatedClassName])
                .concat(classes)
                .filter(value => !!value)
                .join(' ');
        },
        
        applyPrefix(className) {
            return `${this.prefix}${className}`;
        }

    }

};
</script>