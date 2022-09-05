// Song data
var audio;
var songLoaded = false;
var ready = false;
var song = {
    songData: [{ // Instrument 0
            i: [
                3, // OSC1_WAVEFORM
                162, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                3, // OSC2_WAVEFORM
                0, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                5, // ENV_ATTACK
                6, // ENV_SUSTAIN
                45, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                0, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                2, // FX_FILTER
                255, // FX_FREQ
                0, // FX_RESONANCE
                6, // FX_DIST
                69, // FX_DRIVE
                0, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                0, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
            ],
            // Patterns
            p: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 27, 33, 27, 33, 27, 33, 27, 33],
            // Columns
            c: [{
                    n: [113, , 113, 113, 113, , 113, 113, , 108, 113, 108, 115, 116, 111, 108, , 113, 113, , 113, , 113, 113, , 108, 113, 108, 115, 116, 111, 115],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [121, , 121, 121, 121, , 121, 121, , 116, 121, 116, 123, 125, 116, 121, , 120, 120, , 120, , 120, 120, , 111, 115, 111, 118, 120, 123, 125],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [118, , 118, 118, 118, , 118, 118, , 113, 118, 113, 120, 121, 123, 115, , 115, 115, , 115, , 115, 115, , 113, 111, 113, 115, 116, 118, 120],
                    f: []
                }
            ]
        },
        { // Instrument 1
            i: [
                0, // OSC1_WAVEFORM
                119, // OSC1_VOL
                128, // OSC1_SEMI
                1, // OSC1_XENV
                3, // OSC2_WAVEFORM
                0, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                0, // ENV_ATTACK
                0, // ENV_SUSTAIN
                43, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                0, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                2, // FX_FILTER
                255, // FX_FREQ
                117, // FX_RESONANCE
                3, // FX_DIST
                212, // FX_DRIVE
                0, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                0, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
            ],
            // Patterns
            p: [, , , , 2, 2, 2, , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            // Columns
            c: [{
                    n: [],
                    f: []
                },
                {
                    n: [125, , , 125, , , 125, 125, , , 125, , , , , , , , 125, 125, , , , 125, , , 125],
                    f: []
                }
            ]
        },
        { // Instrument 2
            i: [
                2, // OSC1_WAVEFORM
                0, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                3, // OSC2_WAVEFORM
                0, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                196, // NOISE_VOL
                5, // ENV_ATTACK
                6, // ENV_SUSTAIN
                41, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                0, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                2, // FX_FILTER
                149, // FX_FREQ
                0, // FX_RESONANCE
                0, // FX_DIST
                116, // FX_DRIVE
                0, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                27, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
            ],
            // Patterns
            p: [, , , 7, 3, 3, 3, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            // Columns
            c: [{
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , , , 137, , , , , , , , 137, , , , , , , , 137, , , , , , , , 137, , 137, 137],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , 137, , 137, 137],
                    f: []
                }
            ]
        },
        { // Instrument 3
            i: [
                2, // OSC1_WAVEFORM
                0, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                3, // OSC2_WAVEFORM
                0, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                131, // NOISE_VOL
                5, // ENV_ATTACK
                6, // ENV_SUSTAIN
                29, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                0, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                1, // FX_FILTER
                135, // FX_FREQ
                0, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                147, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                92, // FX_DELAY_AMT
                2 // FX_DELAY_TIME
            ],
            // Patterns
            p: [, , 4, 8, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            // Columns
            c: [{
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [185, , , 185, , , 185, , , 185, , , 185, 185, , , 185, , , 185, , , 185, , , 185, , , 185, 185],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [185, , , 185, , , 185, , , 185, , , 185, 185],
                    f: []
                }
            ]
        },
        { // Instrument 4
            i: [
                2, // OSC1_WAVEFORM
                100, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                1, // OSC2_WAVEFORM
                201, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                5, // ENV_ATTACK
                6, // ENV_SUSTAIN
                44, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                0, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                2, // FX_FILTER
                83, // FX_FREQ
                0, // FX_RESONANCE
                0, // FX_DIST
                5, // FX_DRIVE
                147, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                45, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
            ],
            // Patterns
            p: [, , , , 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 29, 11, 29, 11, 29, 11, 29],
            // Columns
            c: [{
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [137, 137, 137, , 137, 137, , 137, , 137, 137, , 137, 137, , 137, , 125, 125, , 137, 137, , 137, , 137, 137, , 137, 137, , 137, 140, 140, 140, , 140, 140, , 140, , 140, 140, , 140, 140, , 140, , 128, 128, , 140, 140, , 140, , 140, 140, , 140, 140, , 140, 144, 144, 144, , 144, 144, , 144, , 144, 144, , 144, 144, , 144, , 132, 132, , 144, 144, , 144, , 144, 144, , 144, 144, , 144, 147, 147, 147, , 147, 147, , 147, , 147, 147, , 147, 147, , 147, , 135, 135, , 147, 147, , 147, , 147, 147, , 147, 147, , 147],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [137, 137, 137, , 137, 137, , 137, , 137, 137, , 137, 137, , 137, , 123, 123, , 135, 135, , 135, , 135, 135, , 135, 135, , 135, 140, 140, 140, , 140, 140, , 140, , 140, 140, , 140, 140, , 140, , 127, 127, , 139, 139, , 139, , 139, 139, , 139, 139, , 139, 144, 144, 144, , 144, 144, , 144, , 144, 144, , 144, 144, , 144, , 130, 130, , 142, 142, , 142, , 142, 142, , 142, 142, , 142, 147, 147, 147, , 147, 147, , 147, , 147, 147, , 147, 147, , 147, , 132, 132, , 144, 144, , 144, , 144, 144, , 144, 144, , 144],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [137, 137, 137, , 137, 137, , 137, , 137, 137, , 137, 137, , 137, , 123, 123, , 135, 135, , 135, , 135, 135, , 135, 135, , 135, 140, 140, 140, , 140, 140, , 140, , 140, 140, , 140, 140, , 140, , 127, 127, , 139, 139, , 139, , 139, 139, , 139, 139, , 139, 142, 142, 142, , 142, 142, , 142, , 142, 142, , 142, 142, , 142, , 130, 130, , 142, 142, , 142, , 142, 142, , 142, 142, , 142, 145, 145, 145, , 145, 145, , 145, , 145, 145, , 145, 145, , 145, , 133, 133, , 145, 145, , 145, , 145, 145, , 145, 145, , 145],
                    f: []
                }
            ]
        },
        { // Instrument 5
            i: [
                1, // OSC1_WAVEFORM
                100, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                3, // OSC2_WAVEFORM
                201, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                5, // ENV_ATTACK
                6, // ENV_SUSTAIN
                58, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                0, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                2, // FX_FILTER
                188, // FX_FREQ
                53, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                0, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                27, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
            ],
            // Patterns
            p: [, , , , , , , , 6, 9, 6, 10, 6, 9, 6, 10, 36, 34, 13, 32, 36, 34, 13, 32],
            // Columns
            c: [{
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , , , 152, , , , 151, , 147, , , , 154, , , , 152, , , , 151, , , , 147, , 144, , 142],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , , , 152, , , , 151, , 147, , , , 154, , , , 156, , , , 144, , 154, , 152, , 151, , 152],
                    f: []
                },
                {
                    n: [, , , , 152, , , , 151, , 147, , , , 140, , 151, , 152, , 142, , 154, , 156, , 144, , 159, , 161],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , , , 149, , , , 152, , , , 157, , , , 159, , , , 161, , 159, , , , 152, , 163, , 164],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , 166, , 164, , 163, , 159, , , , , , 164, , 163, , 159, , 156, , , , 154, 156, 157, 159, 161, 156, 152, 151],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , 157, , 156, , 152, , 149, , , , 147, , 149, , 151, , 152, , 151, , 147, , 142, 140, 139, 140, 142, 144, 145, 147],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [, , , , 149, , , , 152, , , , 157, , , , 159, , , , 161, , 159, , , , 152, , 156, , 157],
                    f: []
                }
            ]
        },
    ],
    rowLen: 5088, // In sample lengths
    patternLen: 32, // Rows per pattern
    endPattern: 23, // End pattern
    numChannels: 6 // Number of channels
};


/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*-
 *
 * Copyright (c) 2011-2013 Marcus Geelnard
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 *
 * 3. This notice may not be removed or altered from any source
 *    distribution.
 *
 */

"use strict";
var CPlayer = function() {

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    // Oscillators
    var osc_sin = function(value) {
        return Math.sin(value * 6.283184);
    };

    var osc_saw = function(value) {
        return 2 * (value % 1) - 1;
    };

    var osc_square = function(value) {
        return (value % 1) < 0.5 ? 1 : -1;
    };

    var osc_tri = function(value) {
        var v2 = (value % 1) * 4;
        if (v2 < 2) return v2 - 1;
        return 3 - v2;
    };

    var getnotefreq = function(n) {
        // 174.61.. / 44100 = 0.003959503758 (F3)
        return 0.003959503758 * Math.pow(2, (n - 128) / 12);
    };

    var createNote = function(instr, n, rowLen) {
        var osc1 = mOscillators[instr.i[0]],
            o1vol = instr.i[1],
            o1xenv = instr.i[3],
            osc2 = mOscillators[instr.i[4]],
            o2vol = instr.i[5],
            o2xenv = instr.i[8],
            noiseVol = instr.i[9],
            attack = instr.i[10] * instr.i[10] * 4,
            sustain = instr.i[11] * instr.i[11] * 4,
            release = instr.i[12] * instr.i[12] * 4,
            releaseInv = 1 / release,
            arp = instr.i[13],
            arpInterval = rowLen * Math.pow(2, 2 - instr.i[14]);

        var noteBuf = new Int32Array(attack + sustain + release);

        // Re-trig oscillators
        var c1 = 0,
            c2 = 0;

        // Local variables.
        var j, j2, e, t, rsample, o1t, o2t;

        // Generate one note (attack + sustain + release)
        for (j = 0, j2 = 0; j < attack + sustain + release; j++, j2++) {
            if (j2 >= 0) {
                // Switch arpeggio note.
                arp = (arp >> 8) | ((arp & 255) << 4);
                j2 -= arpInterval;

                // Calculate note frequencies for the oscillators
                o1t = getnotefreq(n + (arp & 15) + instr.i[2] - 128);
                o2t = getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7]);
            }

            // Envelope
            e = 1;
            if (j < attack) {
                e = j / attack;
            } else if (j >= attack + sustain) {
                e -= (j - attack - sustain) * releaseInv;
            }

            // Oscillator 1
            t = o1t;
            if (o1xenv) {
                t *= e * e;
            }
            c1 += t;
            rsample = osc1(c1) * o1vol;

            // Oscillator 2
            t = o2t;
            if (o2xenv) {
                t *= e * e;
            }
            c2 += t;
            rsample += osc2(c2) * o2vol;

            // Noise oscillator
            if (noiseVol) {
                rsample += (2 * Math.random() - 1) * noiseVol;
            }

            // Add to (mono) channel buffer
            noteBuf[j] = (80 * rsample * e) | 0;
        }

        return noteBuf;
    };


    //--------------------------------------------------------------------------
    // Private members
    //--------------------------------------------------------------------------

    // Array of oscillator functions
    var mOscillators = [
        osc_sin,
        osc_square,
        osc_saw,
        osc_tri
    ];

    // Private variables set up by init()
    var mSong, mLastRow, mCurrentCol, mNumWords, mMixBuf;


    //--------------------------------------------------------------------------
    // Initialization
    //--------------------------------------------------------------------------

    this.init = function(song) {
        // Define the song
        mSong = song;

        // Init iteration state variables
        mLastRow = song.endPattern;
        mCurrentCol = 0;

        // Prepare song info
        mNumWords = song.rowLen * song.patternLen * (mLastRow + 1) * 2;

        // Create work buffer (initially cleared)
        mMixBuf = new Int32Array(mNumWords);
    };


    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    // Generate audio data for a single track
    this.generate = function() {
        // Local variables
        var i, j, b, p, row, col, n, cp,
            k, t, lfor, e, x, rsample, rowStartSample, f, da;

        // Put performance critical items in local variables
        var chnBuf = new Int32Array(mNumWords),
            instr = mSong.songData[mCurrentCol],
            rowLen = mSong.rowLen,
            patternLen = mSong.patternLen;

        // Clear effect state
        var low = 0,
            band = 0,
            high;
        var lsample, filterActive = false;

        // Clear note cache.
        var noteCache = [];

        // Patterns
        for (p = 0; p <= mLastRow; ++p) {
            cp = instr.p[p];

            // Pattern rows
            for (row = 0; row < patternLen; ++row) {
                // Execute effect command.
                var cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
                if (cmdNo) {
                    instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;

                    // Clear the note cache since the instrument has changed.
                    if (cmdNo < 16) {
                        noteCache = [];
                    }
                }

                // Put performance critical instrument properties in local variables
                var oscLFO = mOscillators[instr.i[15]],
                    lfoAmt = instr.i[16] / 512,
                    lfoFreq = Math.pow(2, instr.i[17] - 9) / rowLen,
                    fxLFO = instr.i[18],
                    fxFilter = instr.i[19],
                    fxFreq = instr.i[20] * 43.23529 * 3.141592 / 44100,
                    q = 1 - instr.i[21] / 255,
                    dist = instr.i[22] * 1e-5,
                    drive = instr.i[23] / 32,
                    panAmt = instr.i[24] / 512,
                    panFreq = 6.283184 * Math.pow(2, instr.i[25] - 9) / rowLen,
                    dlyAmt = instr.i[26] / 255,
                    dly = instr.i[27] * rowLen & ~1; // Must be an even number

                // Calculate start sample number for this row in the pattern
                rowStartSample = (p * patternLen + row) * rowLen;

                // Generate notes for this pattern row
                for (col = 0; col < 4; ++col) {
                    n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
                    if (n) {
                        if (!noteCache[n]) {
                            noteCache[n] = createNote(instr, n, rowLen);
                        }

                        // Copy note from the note cache
                        var noteBuf = noteCache[n];
                        for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++, i += 2) {
                            chnBuf[i] += noteBuf[j];
                        }
                    }
                }

                // Perform effects for this pattern row
                for (j = 0; j < rowLen; j++) {
                    // Dry mono-sample
                    k = (rowStartSample + j) * 2;
                    rsample = chnBuf[k];

                    // We only do effects if we have some sound input
                    if (rsample || filterActive) {
                        // State variable filter
                        f = fxFreq;
                        if (fxLFO) {
                            f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5;
                        }
                        f = 1.5 * Math.sin(f);
                        low += f * band;
                        high = q * (rsample - band) - low;
                        band += f * high;
                        rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;

                        // Distortion
                        if (dist) {
                            rsample *= dist;
                            rsample = rsample < 1 ? rsample > -1 ? osc_sin(rsample * .25) : -1 : 1;
                            rsample /= dist;
                        }

                        // Drive
                        rsample *= drive;

                        // Is the filter active (i.e. still audiable)?
                        filterActive = rsample * rsample > 1e-5;

                        // Panning
                        t = Math.sin(panFreq * k) * panAmt + 0.5;
                        lsample = rsample * (1 - t);
                        rsample *= t;
                    } else {
                        lsample = 0;
                    }

                    // Delay is always done, since it does not need sound input
                    if (k >= dly) {
                        // Left channel = left + right[-p] * t
                        lsample += chnBuf[k - dly + 1] * dlyAmt;

                        // Right channel = right + left[-p] * t
                        rsample += chnBuf[k - dly] * dlyAmt;
                    }

                    // Store in stereo channel buffer (needed for the delay effect)
                    chnBuf[k] = lsample | 0;
                    chnBuf[k + 1] = rsample | 0;

                    // ...and add to stereo mix buffer
                    mMixBuf[k] += lsample | 0;
                    mMixBuf[k + 1] += rsample | 0;
                }
            }
        }

        // Next iteration. Return progress (1.0 == done!).
        mCurrentCol++;
        return mCurrentCol / mSong.numChannels;
    };

    // Create a WAVE formatted Uint8Array from the generated audio data
    this.createWave = function() {
        // Create WAVE header
        var headerLen = 44;
        var l1 = headerLen + mNumWords * 2 - 8;
        var l2 = l1 - 36;
        var wave = new Uint8Array(headerLen + mNumWords * 2);
        wave.set(
            [82, 73, 70, 70,
                l1 & 255, (l1 >> 8) & 255, (l1 >> 16) & 255, (l1 >> 24) & 255,
                87, 65, 86, 69, 102, 109, 116, 32, 16, 0, 0, 0, 1, 0, 2, 0,
                68, 172, 0, 0, 16, 177, 2, 0, 4, 0, 16, 0, 100, 97, 116, 97,
                l2 & 255, (l2 >> 8) & 255, (l2 >> 16) & 255, (l2 >> 24) & 255
            ]
        );

        // Append actual wave data
        for (var i = 0, idx = headerLen; i < mNumWords; ++i) {
            // Note: We clamp here
            var y = mMixBuf[i];
            y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
            wave[idx++] = y & 255;
            wave[idx++] = (y >> 8) & 255;
        }

        // Return the WAVE formatted typed array
        return wave;
    };

    // Get n samples of wave data at time t [s]. Wave data in range [-2,2].
    this.getData = function(t, n) {
        var i = 2 * Math.floor(t * 44100);
        var d = new Array(n);
        for (var j = 0; j < 2 * n; j += 1) {
            var k = i + j;
            d[j] = t > 0 && k < mMixBuf.length ? mMixBuf[k] / 32768 : 0;
        }
        return d;
    };
};

function genAudio() {
    var player = new CPlayer();
    player.init(song);

    setInterval(function() {
        if (songLoaded) {
            return;
        }
        songLoaded = player.generate() >= 1;
        if (songLoaded) {
            var wave = player.createWave();
            audio = document.createElement("audio");
            audio.src = URL.createObjectURL(new Blob([wave], {
                type: "audio/wav"
            }));
            ready = true;
        }
    }, 0);
}
