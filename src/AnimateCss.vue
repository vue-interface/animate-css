<template>
    <transition
        :mode="mode"
        :duration="props.duration"
        :enter-class="enterClass"
        :enter-to-class="enterToClass"
        :enter-active-class="enterActiveClassName"
        :leave-class="leaveClass"
        :leave-to-class="leaveToClass"
        :leave-active-class="leaveActiveClassName"
        @before-enter="(...args: any) => $emit('before-enter', ...args)"
        @enter="(...args: any) => $emit('enter', ...args)"
        @after-enter="(...args: any) => $emit('after-enter', ...args)"
        @before-leave="(...args: any) => $emit('before-leave', ...args)"
        @leave="(...args: any) => $emit('leave', ...args)"
        @after-leave="(...args: any) => $emit('after-leave', ...args)">
        <slot />
    </transition>
</template>

<script lang="ts" setup>
import 'animate.css';
import { camelCase } from 'camel-case';
import { computed, useSlots } from 'vue';

const slots = useSlots();

const props = withDefaults(defineProps<{
    animated?: boolean,
    attentionSeekerEffects?: string[],
    big?: boolean,
    direction?: string,
    directionEffects?: string[],
    down?: boolean,
    duration?: number|{enter:number,leave:number},
    enter?: string,
    enterClass?: string,
    enterToClass?: string,
    enterActiveClass?: string,
    inOut?: boolean,
    leave?: string,    
    leaveClass?: string,
    leaveToClass?: string,
    leaveActiveClass?: string,
    left?: boolean,
    mode?: 'in-out' | 'out-in' | 'default',
    name?: string,
    prefix?: string,
    right?: boolean,
    special?: boolean,
    up?: boolean,
    x?: boolean,
    y?: boolean
}>(), {
    animated: true,
    attentionSeekerEffects: () => ([
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
    ]),
    big: false,
    delay: 0,
    directionEffects: () => ([
        'back',
        'bounce',
        'fade',
        'flip',
        'lightspeed',
        'rotate',
        'roll',
        'slide',
        'zoom'
    ]),
    down: false,
    mode: 'default',
    prefix: 'animate__',
});

function applyPrefix(className: string): string {
    return `${props.prefix}${className}`;
}

function activeClass(key: string, className?: string): string {
    return [
        applyPrefix(
            camelCase([
                props.name,
                !special.value && key,
                !special.value && direction.value,
                !special.value && props.big && 'big'
            ].filter(value => !!value).join(' '))
        )
    ]
        .concat([animatedClassName.value])
        .concat(className || '')
        .filter(value => !!value)
        .join(' ');
}

const direction = computed(() => (
    props.direction ||
    props.x && 'x' ||
    props.y && 'y' ||
    props.up && 'up' ||
    props.down && 'down' ||
    props.left && 'left' ||
    props.right && 'right'
))

const special = computed(() => (
    props.name && (
        !props.inOut && props.attentionSeekerEffects.indexOf(props.name.toLowerCase()) > -1
        || props.directionEffects.indexOf(props.name.toLowerCase()) === -1
    )
));

const animatedClassName = computed(() => {
    return props.animated ? applyPrefix('animated') : '';
});

const enterActiveClassName = computed(() => {
    return props.enter
        ? `${applyPrefix(props.enter)} ${animatedClassName.value}`
        : activeClass('in', props.enterActiveClass);
});

const leaveActiveClassName = computed(() => {
    return props.leave 
        ? `${applyPrefix(props.leave)} ${animatedClassName.value}`
        : activeClass('out', props.leaveActiveClass);
});
</script>