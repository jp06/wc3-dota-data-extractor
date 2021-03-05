/**
 * Warcraft III map parser, part of mdx-m3-viewer by flowtsohg (GhostWolf)
 * Bundled using Rollup and edited the exports to be a bit more module friendly
 * https://github.com/jp06/mdx-m3-viewer/tree/w3x-parser-only
 * I can't install as an npm package from GitHub so I just built it and pasted the bundle here
 */

function boundIndexOf(buffer, target, offset = 0, length = Infinity) {
    let start = Math.max(offset, 0);
    let end = Math.min(start + length, buffer.length);
    for (let i = start; i < end; i++) {
        if (buffer[i] === target) {
            return i;
        }
    }
    return -1;
}

const buffer = new ArrayBuffer(8);
const int8 = new Int8Array(buffer);
const int16 = new Int16Array(buffer);
const int32 = new Int32Array(buffer);
const uint8 = new Uint8Array(buffer);
const uint16 = new Uint16Array(buffer);
const uint32 = new Uint32Array(buffer);
const float32 = new Float32Array(buffer);
const float64 = new Float64Array(buffer);
/**
 * Typecast a 8 bit unsigned integer to a 8 bits signed integer.
 */
function uint8ToInt8(a) {
    uint8[0] = a;
    return int8[0];
}
/**
 * Typecast two 8 bit unsigned integers to a 16 bits signed integer.
 */
function uint8ToInt16(a, b) {
    uint8[0] = a;
    uint8[1] = b;
    return int16[0];
}
/**
 * Typecast four 8 bit unsigned integers to a 32 bits signed integer.
 */
function uint8ToInt32(a, b, c, d) {
    uint8[0] = a;
    uint8[1] = b;
    uint8[2] = c;
    uint8[3] = d;
    return int32[0];
}
/**
 * Typecast two 8 bit unsigned integers to a 16 bits unsigned integer.
 */
function uint8ToUint16(a, b) {
    uint8[0] = a;
    uint8[1] = b;
    return uint16[0];
}
/**
 * Typecast four 8 bit unsigned integers to a 32 bits unsigned integer.
 */
function uint8ToUint32(a, b, c, d) {
    uint8[0] = a;
    uint8[1] = b;
    uint8[2] = c;
    uint8[3] = d;
    return uint32[0];
}
/**
 * Typecast four 8 bit unsigned integers to a 32 bits IEEE float.
 */
function uint8ToFloat32(a, b, c, d) {
    uint8[0] = a;
    uint8[1] = b;
    uint8[2] = c;
    uint8[3] = d;
    return float32[0];
}
/**
 * Typecast eight 8 bit unsigned integers to a 64 bits IEEE float.
 */
function uint8ToFloat64(a, b, c, d, e, f, g, h) {
    uint8[0] = a;
    uint8[1] = b;
    uint8[2] = c;
    uint8[3] = d;
    uint8[4] = e;
    uint8[5] = f;
    uint8[6] = g;
    uint8[7] = h;
    return float64[0];
}
/**
 * Typecast a 8 bit signed integer to a 8 bit unsigned integer.
 */
function int8ToUint8(a) {
    uint8[0] = a;
    return int8[0];
}
/**
 * Typecast a 16 bit signed integer to two 8 bit unsigned integers.
 *
 * The result is stored in out.
 */
function int16ToUint8(out, a) {
    int16[0] = a;
    out[0] = uint8[0];
    out[1] = uint8[1];
    return out;
}
/**
 * Typecast a 32 bit signed integer to four 8 bit unsigned integers.
 *
 * The result is stored in out.
 */
function int32ToUint8(out, a) {
    int32[0] = a;
    out[0] = uint8[0];
    out[1] = uint8[1];
    out[2] = uint8[2];
    out[3] = uint8[3];
    return out;
}
/**
 * Typecast a 16 bit unsigned integer to two 8 bit unsigned integers.
 *
 * The result is stored in out.
 */
function uint16ToUint8(out, a) {
    uint16[0] = a;
    out[0] = uint8[0];
    out[1] = uint8[1];
    return out;
}
/**
 * Typecast a 32 bit unsigned integer to four 8 bit unsigned integers.
 *
 * The result is stored in out.
 */
function uint32ToUint8(out, a) {
    uint32[0] = a;
    out[0] = uint8[0];
    out[1] = uint8[1];
    out[2] = uint8[2];
    out[3] = uint8[3];
    return out;
}
/**
 * Typecast a 32 bit IEEE float to four 8 bit unsigned integers.
 *
 * The result is stored in out.
 */
function float32ToUint8(out, a) {
    float32[0] = a;
    out[0] = uint8[0];
    out[1] = uint8[1];
    out[2] = uint8[2];
    out[3] = uint8[3];
    return out;
}
/**
 * Typecast a 64 bit IEEE float to eight 8 bit unsigned integers.
 *
 * The result is stored in out.
 */
function float64ToUint8(out, a) {
    float64[0] = a;
    out[0] = uint8[0];
    out[1] = uint8[1];
    out[2] = uint8[2];
    out[3] = uint8[3];
    out[4] = uint8[4];
    out[5] = uint8[5];
    out[6] = uint8[6];
    out[7] = uint8[7];
    return out;
}
/**
 * Typecast a normal JavaScript number to a 32 bits unsigned integer.
 */
function numberToUint32(number) {
    uint32[0] = number;
    return uint32[0];
}
/**
 * Return the given buffer as a Uint8Array, whether it is an ArrayBuffer, a Uint8Array, or a normal array of numbers.
 */
function bytesOf(buffer) {
    if (buffer instanceof Uint8Array) {
        return buffer;
    }
    else {
        return new Uint8Array(buffer);
    }
}

let decoder = new TextDecoder();
let encoder = new TextEncoder();
/**
 * Decode bytes as a UTF8 string.
 */
function decodeUtf8(buffer) {
    return decoder.decode(buffer);
}
/**
 * Encode a UTF8 string to bytes.
 */
function encodeUtf8(utf8) {
    return encoder.encode(utf8);
}
/**
 * Get the byte length of a UTF8 string.
 *
 * @see https://stackoverflow.com/a/23329386
 */
function byteLengthUtf8(str) {
    // returns the byte length of an utf8 string
    var s = str.length;
    for (var i = str.length - 1; i >= 0; i--) {
        var code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff)
            s++;
        else if (code > 0x7ff && code <= 0xffff)
            s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF)
            i--; //trail surrogate
    }
    return s;
}

// Memory for all of the xxxToUint type casts.
const uint8$1 = new Uint8Array(8);
/**
 * A binary stream.
 */
class BinaryStream {
    constructor(buffer, byteOffset, byteLength) {
        this.index = 0;
        let bytes = bytesOf(buffer);
        // For browsers not supporting the spec.
        // Once upon a time I reported this issue on the Firefox tracker.
        // Seems like Safari needs an issue report too.
        byteOffset = byteOffset || 0;
        byteLength = byteLength || bytes.length;
        this.buffer = buffer;
        this.uint8array = bytes.subarray(byteOffset, byteOffset + byteLength);
        this.byteLength = byteLength;
        this.remaining = byteLength;
    }
    /**
     * Create a subreader of this reader, at its position, with the given byte length.
     */
    substream(byteLength) {
        return new BinaryStream(this.uint8array.subarray(this.index, this.index + byteLength));
    }
    /**
     * Skip a number of bytes.
     */
    skip(bytes) {
        if (this.remaining < bytes) {
            throw new Error(`ByteStream: skip: premature end - want ${bytes} bytes but have ${this.remaining}`);
        }
        this.index += bytes;
        this.remaining -= bytes;
    }
    /**
     * Set the reader's index.
     */
    seek(index) {
        this.index = index;
        this.remaining = this.byteLength - index;
    }
    /**
     * Read a UTF8 string with the given number of bytes.
     *
     * The entire size will be read, however the string returned is NULL terminated in its memory block.
     *
     * For example, the MDX format has many strings that have a constant maximum size, where any bytes after the string are NULLs.
     * Such strings will be loaded correctly given the maximum size.
     */
    read(bytes) {
        if (this.remaining < bytes) {
            throw new Error(`ByteStream: read: premature end - want ${bytes} bytes but have ${this.remaining}`);
        }
        let uint8array = this.uint8array;
        let start = this.index;
        let end = boundIndexOf(uint8array, 0, start, bytes);
        if (end === -1) {
            end = start + bytes;
        }
        this.index += bytes;
        this.remaining -= bytes;
        return decodeUtf8(uint8array.subarray(start, end));
    }
    /**
     * Read a UTF8 NULL terminated string.
     */
    readNull() {
        if (this.remaining < 1) {
            throw new Error(`ByteStream: readNull: premature end - want at least 1 byte but have 0`);
        }
        let uint8array = this.uint8array;
        let start = this.index;
        let end = uint8array.indexOf(0, start);
        if (end === -1) {
            end = uint8array.length - 1;
        }
        let bytes = end - start + 1;
        this.index += bytes;
        this.remaining -= bytes;
        return decodeUtf8(uint8array.subarray(start, end));
    }
    /**
     * Read a binary string with the given number of bytes.
     */
    readBinary(bytes) {
        if (this.remaining < bytes) {
            throw new Error(`ByteStream: readBinary: premature end - want ${bytes} bytes but have ${this.remaining}`);
        }
        let uint8array = this.uint8array;
        let index = this.index;
        let data = '';
        for (let i = 0; i < bytes; i++) {
            data += String.fromCharCode(uint8array[index + i]);
        }
        this.index += bytes;
        this.remaining -= bytes;
        return data;
    }
    /**
     * Read a 8 bit signed integer.
     */
    readInt8() {
        if (this.remaining < 1) {
            throw new Error(`ByteStream: readInt8: premature end - want 1 byte but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        let data = uint8ToInt8(uint8array[index]);
        this.index += 1;
        this.remaining -= 1;
        return data;
    }
    /**
     * Read a 16 bit signed integer.
     */
    readInt16() {
        if (this.remaining < 2) {
            throw new Error(`ByteStream: readInt16: premature end - want 2 bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        let data = uint8ToInt16(uint8array[index], uint8array[index + 1]);
        this.index += 2;
        this.remaining -= 2;
        return data;
    }
    /**
     * Read a 32 bit signed integer.
     */
    readInt32() {
        if (this.remaining < 4) {
            throw new Error(`ByteStream: readInt32: premature end - want 4 bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        let data = uint8ToInt32(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3]);
        this.index += 4;
        this.remaining -= 4;
        return data;
    }
    /**
     * Read a 8 bit unsigned integer.
     */
    readUint8() {
        if (this.remaining < 1) {
            throw new Error(`ByteStream: readUint8: premature end - want 1 byte but have ${this.remaining}`);
        }
        let data = this.uint8array[this.index];
        this.index += 1;
        this.remaining -= 1;
        return data;
    }
    /**
     * Read a 16 bit unsigned integer.
     */
    readUint16() {
        if (this.remaining < 2) {
            throw new Error(`ByteStream: readUint16: premature end - want 2 bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        let data = uint8ToUint16(uint8array[index], uint8array[index + 1]);
        this.index += 2;
        this.remaining -= 2;
        return data;
    }
    /**
     * Read a 32 bit unsigned integer.
     */
    readUint32() {
        if (this.remaining < 4) {
            throw new Error(`ByteStream: readUint32: premature end - want 4 bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        let data = uint8ToUint32(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3]);
        this.index += 4;
        this.remaining -= 4;
        return data;
    }
    /**
     * Read a 32 bit float.
     */
    readFloat32() {
        if (this.remaining < 4) {
            throw new Error(`ByteStream: readFloat32: premature end - want 4 bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        let data = uint8ToFloat32(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3]);
        this.index += 4;
        this.remaining -= 4;
        return data;
    }
    /**
     * Read a 64 bit float.
     */
    readFloat64() {
        if (this.remaining < 8) {
            throw new Error(`ByteStream: readFloat64: premature end - want 8 bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        let data = uint8ToFloat64(uint8array[index], uint8array[index + 1], uint8array[index + 2], uint8array[index + 3], uint8array[index + 4], uint8array[index + 5], uint8array[index + 6], uint8array[index + 7]);
        this.index += 8;
        this.remaining -= 8;
        return data;
    }
    /**
     * Read an array of 8 bit signed integers.
     */
    readInt8Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Int8Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readInt8Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            view[i] = uint8ToInt8(uint8array[index + i]);
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Read an array of 16 bit signed integers.
     */
    readInt16Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Int16Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readInt16Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 2;
            view[i] = uint8ToInt16(uint8array[offset], uint8array[offset + 1]);
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Read an array of 32 bit signed integers.
     */
    readInt32Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Int32Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readInt32Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 4;
            view[i] = uint8ToInt32(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3]);
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Read an array of 8 bit unsigned integers.
     */
    readUint8Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Uint8Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readUint8Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            view[i] = uint8array[index + i];
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Read an array of 16 bit unsigned integers.
     */
    readUint16Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Uint16Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readUint16Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 2;
            view[i] = uint8ToUint16(uint8array[offset], uint8array[offset + 1]);
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Read an array of 32 bit unsigned integers.
     */
    readUint32Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Uint32Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readUint32Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 4;
            view[i] = uint8ToUint32(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3]);
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Read an array of 32 bit floats.
     */
    readFloat32Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Float32Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readFloat32Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 4;
            view[i] = uint8ToFloat32(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3]);
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Read an array of 64 bit floats.
     */
    readFloat64Array(view) {
        if (!ArrayBuffer.isView(view)) {
            view = new Float64Array(view);
        }
        if (this.remaining < view.byteLength) {
            throw new Error(`ByteStream: readFloat64Array: premature end - want ${view.byteLength} bytes but have ${this.remaining}`);
        }
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 8;
            view[i] = uint8ToFloat64(uint8array[offset], uint8array[offset + 1], uint8array[offset + 2], uint8array[offset + 3], uint8array[offset + 4], uint8array[offset + 5], uint8array[offset + 6], uint8array[offset + 7]);
        }
        this.index += view.byteLength;
        this.remaining -= view.byteLength;
        return view;
    }
    /**
     * Write a UTF8 string.
     *
     * Returns the number of bytes that were written,
     */
    write(utf8) {
        let bytes = encodeUtf8(utf8);
        this.writeUint8Array(bytes);
        return bytes.length;
    }
    /**
     * Write a UTF8 string as a NULL terminated string.
     *
     * Returns the number of bytes that were written, including the terminating NULL.
     */
    writeNull(utf8) {
        let bytes = this.write(utf8);
        this.index++;
        this.remaining--;
        return bytes + 1;
    }
    /**
     * Write a binary string.
     */
    writeBinary(value) {
        let index = this.index;
        let uint8array = this.uint8array;
        let count = value.length;
        for (let i = 0; i < count; i++) {
            uint8array[index + i] = value.charCodeAt(i);
        }
        this.index += count;
    }
    /**
     * Write a 8 bit signed integer.
     */
    writeInt8(value) {
        this.uint8array[this.index] = int8ToUint8(value);
        this.index += 1;
    }
    /**
     * Write a 16 bit signed integer.
     */
    writeInt16(value) {
        let index = this.index;
        let uint8array = this.uint8array;
        int16ToUint8(uint8$1, value);
        uint8array[index] = uint8$1[0];
        uint8array[index + 1] = uint8$1[1];
        this.index += 2;
    }
    /**
     * Write a 32 bit signed integer.
     */
    writeInt32(value) {
        let index = this.index;
        let uint8array = this.uint8array;
        int32ToUint8(uint8$1, value);
        uint8array[index] = uint8$1[0];
        uint8array[index + 1] = uint8$1[1];
        uint8array[index + 2] = uint8$1[2];
        uint8array[index + 3] = uint8$1[3];
        this.index += 4;
    }
    /**
     * Write a 8 bit unsigned integer.
     */
    writeUint8(value) {
        this.uint8array[this.index] = value;
        this.index += 1;
    }
    /**
     * Write a 16 bit unsigned integer.
     */
    writeUint16(value) {
        let index = this.index;
        let uint8array = this.uint8array;
        uint16ToUint8(uint8$1, value);
        uint8array[index] = uint8$1[0];
        uint8array[index + 1] = uint8$1[1];
        this.index += 2;
    }
    /**
     * Write a 32 bit unsigned integer.
     */
    writeUint32(value) {
        let index = this.index;
        let uint8array = this.uint8array;
        uint32ToUint8(uint8$1, value);
        uint8array[index] = uint8$1[0];
        uint8array[index + 1] = uint8$1[1];
        uint8array[index + 2] = uint8$1[2];
        uint8array[index + 3] = uint8$1[3];
        this.index += 4;
    }
    /**
     * Write a 32 bit float.
     */
    writeFloat32(value) {
        let index = this.index;
        let uint8array = this.uint8array;
        float32ToUint8(uint8$1, value);
        uint8array[index] = uint8$1[0];
        uint8array[index + 1] = uint8$1[1];
        uint8array[index + 2] = uint8$1[2];
        uint8array[index + 3] = uint8$1[3];
        this.index += 4;
    }
    /**
     * Write a 64 bit float.
     */
    writeFloat64(value) {
        let index = this.index;
        let uint8array = this.uint8array;
        float64ToUint8(uint8$1, value);
        uint8array[index] = uint8$1[0];
        uint8array[index + 1] = uint8$1[1];
        uint8array[index + 2] = uint8$1[2];
        uint8array[index + 3] = uint8$1[3];
        uint8array[index + 4] = uint8$1[4];
        uint8array[index + 5] = uint8$1[5];
        uint8array[index + 6] = uint8$1[6];
        uint8array[index + 7] = uint8$1[7];
        this.index += 8;
    }
    /**
     * Write an array of 8 bit signed integers.
     */
    writeInt8Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            uint8array[index + i] = int8ToUint8(view[i]);
        }
        this.index += view.byteLength;
    }
    /**
     * Write an array of 16 bit signed integers.
     */
    writeInt16Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 2;
            int16ToUint8(uint8$1, view[i]);
            uint8array[offset] = uint8$1[0];
            uint8array[offset + 1] = uint8$1[1];
        }
        this.index += view.byteLength;
    }
    /**
     * Write an array of 32 bit signed integers.
     */
    writeInt32Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 4;
            int32ToUint8(uint8$1, view[i]);
            uint8array[offset] = uint8$1[0];
            uint8array[offset + 1] = uint8$1[1];
            uint8array[offset + 2] = uint8$1[2];
            uint8array[offset + 3] = uint8$1[3];
        }
        this.index += view.byteLength;
    }
    /**
     * Write an array of 8 bit unsigned integers.
     */
    writeUint8Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            uint8array[index + i] = view[i];
        }
        this.index += view.byteLength;
    }
    /**
     * Write an array of 16 bit unsigned integers.
     */
    writeUint16Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 2;
            uint16ToUint8(uint8$1, view[i]);
            uint8array[offset] = uint8$1[0];
            uint8array[offset + 1] = uint8$1[1];
        }
        this.index += view.byteLength;
    }
    /**
     * Write an array of 32 bit unsigned integers.
     */
    writeUint32Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 4;
            uint32ToUint8(uint8$1, view[i]);
            uint8array[offset] = uint8$1[0];
            uint8array[offset + 1] = uint8$1[1];
            uint8array[offset + 2] = uint8$1[2];
            uint8array[offset + 3] = uint8$1[3];
        }
        this.index += view.byteLength;
    }
    /**
     * Write an array of 32 bit floats.
     */
    writeFloat32Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 4;
            float32ToUint8(uint8$1, view[i]);
            uint8array[offset] = uint8$1[0];
            uint8array[offset + 1] = uint8$1[1];
            uint8array[offset + 2] = uint8$1[2];
            uint8array[offset + 3] = uint8$1[3];
        }
        this.index += view.byteLength;
    }
    /**
     * Write an array of 64 bit floats.
     */
    writeFloat64Array(view) {
        let index = this.index;
        let uint8array = this.uint8array;
        for (let i = 0, l = view.length; i < l; i++) {
            let offset = index + i * 8;
            float64ToUint8(uint8$1, view[i]);
            uint8array[offset] = uint8$1[0];
            uint8array[offset + 1] = uint8$1[1];
            uint8array[offset + 2] = uint8$1[2];
            uint8array[offset + 3] = uint8$1[3];
            uint8array[offset + 4] = uint8$1[4];
            uint8array[offset + 5] = uint8$1[5];
            uint8array[offset + 6] = uint8$1[6];
            uint8array[offset + 7] = uint8$1[7];
        }
        this.index += view.byteLength;
    }
}

/**
 * Convert from degrees to radians.
 */
/**
 * Gets the closest power of two bigger or equal to the given number.
 */
function powerOfTwo(x) {
    x--;
    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    x++;
    return x;
}
/**
 * Given a number, truncates digits after the decimal point.
 * The given precision should be in base 10.
 * E.g. for a precision of two digits after the decimal point, the precision should be 100.
 * The result is returned as a string.
 */
function floatDecimals(value, precision) {
    return `${Math.trunc(value * precision) / precision}`;
}
/**
 * Uses floatDecimals on a typed array, and returns its string representation.
 */
function floatArrayDecimals(value, precision) {
    if (value instanceof Float32Array) {
        let array = [];
        for (let i = 0, l = value.length; i < l; i++) {
            array[i] = floatDecimals(value[i], precision);
        }
        return array.join(', ');
    }
    else {
        return value.join(', ');
    }
}

/**
 * A block.
 */
class Block {
    constructor() {
        this.offset = 0;
        this.compressedSize = 0;
        this.normalSize = 0;
        this.flags = 0;
    }
    load(bytes) {
        this.offset = bytes[0];
        this.compressedSize = bytes[1];
        this.normalSize = bytes[2];
        this.flags = bytes[3];
    }
    save(bytes) {
        bytes[0] = this.offset;
        bytes[1] = this.compressedSize;
        bytes[2] = this.normalSize;
        bytes[3] = this.flags;
    }
}

const MAGIC = 0x1A51504D; // MPQ\x1A reversed
const HASH_TABLE_KEY = 0xC3AF3770; // Hash of (hashtable)
const HASH_TABLE_INDEX = 0;
const HASH_NAME_A = 1;
const HASH_NAME_B = 2;
const HASH_FILE_KEY = 3;
const HASH_ENTRY_DELETED = 0xFFFFFFFE;
const HASH_ENTRY_EMPTY = 0xFFFFFFFF;
const BLOCK_TABLE_KEY = 0xEC83B3A3; // Hash of (blocktable)
const FILE_COMPRESSED = 0x00000200;
const FILE_ENCRYPTED = 0x00010000;
const FILE_OFFSET_ADJUSTED_KEY = 0x00020000;
const FILE_SINGLE_UNIT = 0x01000000;
const FILE_EXISTS = 0x80000000;
const COMPRESSION_HUFFMAN = 0x01;
const COMPRESSION_DEFLATE = 0x02;
const COMPRESSION_IMPLODE = 0x08;
const COMPRESSION_BZIP2 = 0x10;
const COMPRESSION_ADPCM_MONO = 0x40;
const COMPRESSION_ADPCM_STEREO = 0x80;

/**
 * A block table.
 */
class BlockTable {
    constructor(c) {
        this.c = c;
        this.entries = [];
    }
    add(buffer) {
        let block = new Block();
        block.normalSize = buffer.byteLength;
        this.entries.push(block);
        return block;
    }
    clear() {
        this.entries.length = 0;
    }
    addEmpties(howMany) {
        for (let i = 0; i < howMany; i++) {
            this.entries.push(new Block());
        }
    }
    load(bytes) {
        let entriesCount = bytes.byteLength / 16;
        let uint32array = new Uint32Array(this.c.decryptBlock(bytes, BLOCK_TABLE_KEY).buffer);
        let offset = 0;
        // Clear the table and add the needed empties.
        this.clear();
        this.addEmpties(entriesCount);
        for (let block of this.entries) {
            block.load(uint32array.subarray(offset, offset + 4));
            offset += 4;
        }
    }
    save(bytes) {
        let uint32array = new Uint32Array(this.entries.length * 4);
        let offset = 0;
        for (let block of this.entries) {
            block.save(uint32array.subarray(offset, offset + 4));
            offset += 4;
        }
        let uint8array = new Uint8Array(uint32array.buffer);
        this.c.encryptBlock(uint8array, BLOCK_TABLE_KEY);
        bytes.set(uint8array);
    }
}

// Global variables for this module.
const bytes = new Uint8Array(4);
const long = new Uint32Array(bytes.buffer);
/**
 * MPQ crypto.
 */
class MpqCrypto {
    constructor() {
        this.cryptTable = new Uint32Array(0x500);
        let seed = 0x00100001;
        let temp1 = 0;
        let temp2 = 0;
        for (let index1 = 0; index1 < 0x100; index1++) {
            for (let index2 = index1, i = 0; i < 5; i += 1, index2 += 0x100) {
                seed = (seed * 125 + 3) % 0x2AAAAB;
                temp1 = (seed & 0xFFFF) << 0x10;
                seed = (seed * 125 + 3) % 0x2AAAAB;
                temp2 = (seed & 0xFFFF);
                this.cryptTable[index2] = temp1 | temp2;
            }
        }
    }
    hash(name, key) {
        let cryptTable = this.cryptTable;
        let seed1 = 0x7FED7FED;
        let seed2 = 0xEEEEEEEE;
        name = name.toUpperCase();
        for (let i = 0; i < name.length; i++) {
            let ch = name.charCodeAt(i);
            seed1 = cryptTable[(key << 8) + ch] ^ (seed1 + seed2);
            seed2 = ch + seed1 + seed2 + (seed2 << 5) + 3;
        }
        // Convert the seed to an unsigned integer
        return seed1 >>> 0;
    }
    decryptBlock(data, key) {
        let cryptTable = this.cryptTable;
        let seed = 0xEEEEEEEE;
        let view;
        if (data instanceof ArrayBuffer) {
            view = new Uint8Array(data);
        }
        else {
            view = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }
        for (let i = 0, l = data.byteLength >>> 2; i < l; i++) {
            // Update the seed.
            seed += cryptTable[0x400 + (key & 0xFF)];
            // Get 4 encrypted bytes.
            bytes[0] = view[i * 4];
            bytes[1] = view[i * 4 + 1];
            bytes[2] = view[i * 4 + 2];
            bytes[3] = view[i * 4 + 3];
            // Decrypted 32bit integer.
            long[0] ^= (key + seed);
            // Update the seed.
            key = ((~key << 0x15) + 0x11111111) | (key >>> 0x0B);
            seed = long[0] + seed + (seed << 5) + 3;
            // Set 4 decryped bytes.
            view[i * 4] = bytes[0];
            view[i * 4 + 1] = bytes[1];
            view[i * 4 + 2] = bytes[2];
            view[i * 4 + 3] = bytes[3];
        }
        return data;
    }
    encryptBlock(data, key) {
        let cryptTable = this.cryptTable;
        let seed = 0xEEEEEEEE;
        let view;
        if (data instanceof ArrayBuffer) {
            view = new Uint8Array(data);
        }
        else {
            view = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }
        for (let i = 0, l = data.byteLength >>> 2; i < l; i++) {
            // Update the seed.
            seed += cryptTable[0x400 + (key & 0xFF)];
            // Get 4 decrypted bytes.
            bytes[0] = view[i * 4];
            bytes[1] = view[i * 4 + 1];
            bytes[2] = view[i * 4 + 2];
            bytes[3] = view[i * 4 + 3];
            // Decrypted 32bit integer.
            let decrypted = long[0];
            // Encrypted 32bit integer.
            long[0] ^= (key + seed);
            // Update the seed.
            key = ((~key << 0x15) + 0x11111111) | (key >>> 0x0B);
            seed = decrypted + seed + (seed << 5) + 3;
            // Set 4 encrypted bytes.
            view[i * 4] = bytes[0];
            view[i * 4 + 1] = bytes[1];
            view[i * 4 + 2] = bytes[2];
            view[i * 4 + 3] = bytes[3];
        }
        return data;
    }
    computeFileKey(name, block) {
        let sepIndex = name.lastIndexOf('\\');
        let pathlessName = name.substring(sepIndex + 1);
        let encryptionKey = this.hash(pathlessName, HASH_FILE_KEY);
        if (block.flags & FILE_OFFSET_ADJUSTED_KEY) {
            encryptionKey = (encryptionKey + block.offset) ^ block.normalSize;
        }
        return encryptionKey;
    }
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var common = createCommonjsModule(function (module, exports) {


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);
});

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */



/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  common.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

var _tr_init_1  = _tr_init;
var _tr_stored_block_1 = _tr_stored_block;
var _tr_flush_block_1  = _tr_flush_block;
var _tr_tally_1 = _tr_tally;
var _tr_align_1 = _tr_align;

var trees = {
	_tr_init: _tr_init_1,
	_tr_stored_block: _tr_stored_block_1,
	_tr_flush_block: _tr_flush_block_1,
	_tr_tally: _tr_tally_1,
	_tr_align: _tr_align_1
};

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


var adler32_1 = adler32;

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


var crc32_1 = crc32;

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var messages = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.







/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED$1               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN$1             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES$1  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS$1      = 256;
/* number of literal bytes 0..255 */
var L_CODES$1       = LITERALS$1 + 1 + LENGTH_CODES$1;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES$1       = 30;
/* number of distance codes */
var BL_CODES$1      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE$1     = 2 * L_CODES$1 + 1;
/* maximum heap size */
var MAX_BITS$1  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var MIN_LOOKAHEAD = (MAX_MATCH$1 + MIN_MATCH$1 + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = messages[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero$1(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  common.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  common.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH$1;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH$1 - (strend - scan);
    scan = strend - MAX_MATCH$1;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      common.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH$1) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH$1 - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH$1) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH$1) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH$1) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH$1);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH$1) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH$1 - 1)) ? s.strstart : MIN_MATCH$1 - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH$1) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH$1 - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH$1 && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH$1 - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH$1 && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH$1;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH$1);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH$1 - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH$1) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH$1 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH$1 && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH$1;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH$1 - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH$1) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH$1);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero$1(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH$1 - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new common.Buf16(HEAP_SIZE$1 * 2);
  this.dyn_dtree  = new common.Buf16((2 * D_CODES$1 + 1) * 2);
  this.bl_tree    = new common.Buf16((2 * BL_CODES$1 + 1) * 2);
  zero$1(this.dyn_ltree);
  zero$1(this.dyn_dtree);
  zero$1(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new common.Buf16(MAX_BITS$1 + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new common.Buf16(2 * L_CODES$1 + 1);  /* heap used to build the Huffman trees */
  zero$1(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new common.Buf16(2 * L_CODES$1 + 1); //uch depth[2*L_CODES+1];
  zero$1(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN$1;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED$1) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH$1 - 1) / MIN_MATCH$1);

  s.window = new common.Buf8(s.w_size * 2);
  s.head = new common.Buf16(s.hash_size);
  s.prev = new common.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new common.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero$1(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero$1(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new common.Buf8(s.w_size);
    common.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH$1) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH$1 - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH$1 - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH$1 - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH$1 - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2 = deflate;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

var deflate_1 = {
	deflateInit: deflateInit_1,
	deflateInit2: deflateInit2_1,
	deflateReset: deflateReset_1,
	deflateResetKeep: deflateResetKeep_1,
	deflateSetHeader: deflateSetHeader_1,
	deflate: deflate_2,
	deflateEnd: deflateEnd_1,
	deflateSetDictionary: deflateSetDictionary_1,
	deflateInfo: deflateInfo
};

// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new common.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
var string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new common.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, common.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
var buf2binstring_1 = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
var binstring2buf = function (str) {
  var buf = new common.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
var buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

var strings = {
	string2buf: string2buf,
	buf2binstring: buf2binstring_1,
	binstring2buf: binstring2buf,
	buf2string: buf2string,
	utf8border: utf8border
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

var zstream = ZStream;

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH$1      = 0;
var Z_FINISH$1        = 4;

var Z_OK$1            = 0;
var Z_STREAM_END$1    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION$1 = -1;

var Z_DEFAULT_STRATEGY$1    = 0;

var Z_DEFLATED$1  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION$1,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY$1,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new zstream();
  this.strm.avail_out = 0;

  var status = deflate_1.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK$1) {
    throw new Error(messages[status]);
  }

  if (opt.header) {
    deflate_1.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = deflate_1.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK$1) {
      throw new Error(messages[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH$1 : Z_NO_FLUSH$1);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new common.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = deflate_1.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END$1 && status !== Z_OK$1) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH$1 || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(common.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(common.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END$1);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH$1) {
    status = deflate_1.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK$1;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK$1);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK$1) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate$1(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || messages[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}


var Deflate_1 = Deflate;
var deflate_2$1 = deflate$1;
var deflateRaw_1 = deflateRaw;
var gzip_1 = gzip;

var deflate_1$1 = {
	Deflate: Deflate_1,
	deflate: deflate_2$1,
	deflateRaw: deflateRaw_1,
	gzip: gzip_1
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
var inffast = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.



var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

var inftrees = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new common.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new common.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.







var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH$2        = 4;
var Z_BLOCK$1         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK$2            = 0;
var Z_STREAM_END$2    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR$1  = -2;
var Z_DATA_ERROR$1    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR$1     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED$2  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE$1 = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD$1 = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS$1 = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS$1;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new common.Buf16(320); /* temporary storage for code lengths */
  this.work = new common.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new common.Buf32(ENOUGH_LENS$1);
  state.distcode = state.distdyn = new common.Buf32(ENOUGH_DISTS$1);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK$2;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR$1; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$2) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new common.Buf32(512);
    distfix = new common.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inftrees(LENS$1,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inftrees(DISTS$1, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new common.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    common.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    common.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      common.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new common.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR$1;
  }

  state = strm.state;
  if (state.mode === TYPE$1) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK$2;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32_1(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD$1;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED$2) {
          strm.msg = 'unknown compression method';
          state.mode = BAD$1;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD$1;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE$1;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED$2) {
          strm.msg = 'unknown compression method';
          state.mode = BAD$1;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD$1;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32_1(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32_1(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32_1(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              common.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32_1(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32_1(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD$1;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE$1;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE$1;
        /* falls through */
      case TYPE$1:
        if (flush === Z_BLOCK$1 || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD$1;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD$1;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          common.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE$1;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD$1;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inftrees(CODES$1, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD$1;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD$1;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD$1;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD$1) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD$1;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inftrees(LENS$1, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD$1;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inftrees(DISTS$1, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD$1;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inffast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE$1) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE$1;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD$1;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD$1;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD$1;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD$1;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD$1;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD$1;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END$2;
        break inf_leave;
      case BAD$1:
        ret = Z_DATA_ERROR$1;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR$1;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD$1 &&
                      (state.mode < CHECK || flush !== Z_FINISH$2))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE$1 ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH$2) && ret === Z_OK$2) {
    ret = Z_BUF_ERROR$1;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR$1;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$2;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR$1; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK$2;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR$1; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK$2;
}

var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2 = inflate;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

var inflate_1 = {
	inflateReset: inflateReset_1,
	inflateReset2: inflateReset2_1,
	inflateResetKeep: inflateResetKeep_1,
	inflateInit: inflateInit_1,
	inflateInit2: inflateInit2_1,
	inflate: inflate_2,
	inflateEnd: inflateEnd_1,
	inflateGetHeader: inflateGetHeader_1,
	inflateSetDictionary: inflateSetDictionary_1,
	inflateInfo: inflateInfo
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var constants = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

var gzheader = GZheader;

var toString$1 = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = common.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new zstream();
  this.strm.avail_out = 0;

  var status  = inflate_1.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== constants.Z_OK) {
    throw new Error(messages[status]);
  }

  this.header = new gzheader();

  inflate_1.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = inflate_1.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== constants.Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? constants.Z_FINISH : constants.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString$1.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new common.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = inflate_1.inflate(strm, constants.Z_NO_FLUSH);    /* no bad return value */

    if (status === constants.Z_NEED_DICT && dictionary) {
      status = inflate_1.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === constants.Z_BUF_ERROR && allowBufError === true) {
      status = constants.Z_OK;
      allowBufError = false;
    }

    if (status !== constants.Z_STREAM_END && status !== constants.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === constants.Z_STREAM_END || (strm.avail_in === 0 && (_mode === constants.Z_FINISH || _mode === constants.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { common.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(common.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== constants.Z_STREAM_END);

  if (status === constants.Z_STREAM_END) {
    _mode = constants.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === constants.Z_FINISH) {
    status = inflate_1.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === constants.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === constants.Z_SYNC_FLUSH) {
    this.onEnd(constants.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === constants.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate$1(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || messages[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


var Inflate_1 = Inflate;
var inflate_2$1 = inflate$1;
var inflateRaw_1 = inflateRaw;
var ungzip  = inflate$1;

var inflate_1$1 = {
	Inflate: Inflate_1,
	inflate: inflate_2$1,
	inflateRaw: inflateRaw_1,
	ungzip: ungzip
};

var assign    = common.assign;





var pako = {};

assign(pako, deflate_1$1, inflate_1$1, constants);

var pako_1 = pako;

// A near direct copy of Ladislav Zezula's C implementation.
// I left the comments out - if you wish to understand the algorithm, please check the C implementation at https://github.com/ladislav-zezula/StormLib/tree/master/src/pklib
//
// There are three key differences:
//   1) It takes in a Uint8Array, and returns a Uint8Array, rather than using abstract read/write functions.
//   2) The tables are generated once the first time explode() is used.
//      I am not sure why the C implementation copies all of the data and regenerates the tables on every explode().
//      Further more, I am not sure why they are generated at all, unlike the rest of data.
//   3) There is no output circle buffer, the output is a normal JS number array that grows as it will, wrapped at the end with a Uint8Array.
//      It's simple, and I don't think anything else will perform better in JS either way.
const CMP_BINARY = 0;
const CMP_ASCII = 1;
class TDcmpStruct {
    constructor(in_buff) {
        this.ctype = 0;
        this.outputPos = 0;
        this.dsize_bits = 0;
        this.dsize_mask = 0;
        this.bit_buff = 0;
        this.extra_bits = 0;
        this.in_pos = 0;
        this.out_buff = [];
        this.in_buff = in_buff;
    }
}
const PKDCL_OK = 0;
const PKDCL_STREAM_END = 1;
const DistBits = new Uint8Array([
    0x02, 0x04, 0x04, 0x05, 0x05, 0x05, 0x05, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06,
    0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07,
    0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
]);
const DistCode = new Uint8Array([
    0x03, 0x0D, 0x05, 0x19, 0x09, 0x11, 0x01, 0x3E, 0x1E, 0x2E, 0x0E, 0x36, 0x16, 0x26, 0x06, 0x3A,
    0x1A, 0x2A, 0x0A, 0x32, 0x12, 0x22, 0x42, 0x02, 0x7C, 0x3C, 0x5C, 0x1C, 0x6C, 0x2C, 0x4C, 0x0C,
    0x74, 0x34, 0x54, 0x14, 0x64, 0x24, 0x44, 0x04, 0x78, 0x38, 0x58, 0x18, 0x68, 0x28, 0x48, 0x08,
    0xF0, 0x70, 0xB0, 0x30, 0xD0, 0x50, 0x90, 0x10, 0xE0, 0x60, 0xA0, 0x20, 0xC0, 0x40, 0x80, 0x00,
]);
const ExLenBits = new Uint8Array([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
]);
const LenBase = new Uint16Array([
    0x0000, 0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0006, 0x0007,
    0x0008, 0x000A, 0x000E, 0x0016, 0x0026, 0x0046, 0x0086, 0x0106,
]);
const LenBits = new Uint8Array([
    0x03, 0x02, 0x03, 0x03, 0x04, 0x04, 0x04, 0x05, 0x05, 0x05, 0x05, 0x06, 0x06, 0x06, 0x07, 0x07,
]);
const LenCode = new Uint8Array([
    0x05, 0x03, 0x01, 0x06, 0x0A, 0x02, 0x0C, 0x14, 0x04, 0x18, 0x08, 0x30, 0x10, 0x20, 0x40, 0x00,
]);
const ChBitsAsc = new Uint8Array([
    0x0B, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x08, 0x07, 0x0C, 0x0C, 0x07, 0x0C, 0x0C,
    0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0D, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
    0x04, 0x0A, 0x08, 0x0C, 0x0A, 0x0C, 0x0A, 0x08, 0x07, 0x07, 0x08, 0x09, 0x07, 0x06, 0x07, 0x08,
    0x07, 0x06, 0x07, 0x07, 0x07, 0x07, 0x08, 0x07, 0x07, 0x08, 0x08, 0x0C, 0x0B, 0x07, 0x09, 0x0B,
    0x0C, 0x06, 0x07, 0x06, 0x06, 0x05, 0x07, 0x08, 0x08, 0x06, 0x0B, 0x09, 0x06, 0x07, 0x06, 0x06,
    0x07, 0x0B, 0x06, 0x06, 0x06, 0x07, 0x09, 0x08, 0x09, 0x09, 0x0B, 0x08, 0x0B, 0x09, 0x0C, 0x08,
    0x0C, 0x05, 0x06, 0x06, 0x06, 0x05, 0x06, 0x06, 0x06, 0x05, 0x0B, 0x07, 0x05, 0x06, 0x05, 0x05,
    0x06, 0x0A, 0x05, 0x05, 0x05, 0x05, 0x08, 0x07, 0x08, 0x08, 0x0A, 0x0B, 0x0B, 0x0C, 0x0C, 0x0C,
    0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D,
    0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D,
    0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D,
    0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
    0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
    0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
    0x0D, 0x0C, 0x0D, 0x0D, 0x0D, 0x0C, 0x0D, 0x0D, 0x0D, 0x0C, 0x0D, 0x0D, 0x0D, 0x0D, 0x0C, 0x0D,
    0x0D, 0x0D, 0x0C, 0x0C, 0x0C, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D,
]);
const ChCodeAsc = new Uint16Array([
    0x0490, 0x0FE0, 0x07E0, 0x0BE0, 0x03E0, 0x0DE0, 0x05E0, 0x09E0,
    0x01E0, 0x00B8, 0x0062, 0x0EE0, 0x06E0, 0x0022, 0x0AE0, 0x02E0,
    0x0CE0, 0x04E0, 0x08E0, 0x00E0, 0x0F60, 0x0760, 0x0B60, 0x0360,
    0x0D60, 0x0560, 0x1240, 0x0960, 0x0160, 0x0E60, 0x0660, 0x0A60,
    0x000F, 0x0250, 0x0038, 0x0260, 0x0050, 0x0C60, 0x0390, 0x00D8,
    0x0042, 0x0002, 0x0058, 0x01B0, 0x007C, 0x0029, 0x003C, 0x0098,
    0x005C, 0x0009, 0x001C, 0x006C, 0x002C, 0x004C, 0x0018, 0x000C,
    0x0074, 0x00E8, 0x0068, 0x0460, 0x0090, 0x0034, 0x00B0, 0x0710,
    0x0860, 0x0031, 0x0054, 0x0011, 0x0021, 0x0017, 0x0014, 0x00A8,
    0x0028, 0x0001, 0x0310, 0x0130, 0x003E, 0x0064, 0x001E, 0x002E,
    0x0024, 0x0510, 0x000E, 0x0036, 0x0016, 0x0044, 0x0030, 0x00C8,
    0x01D0, 0x00D0, 0x0110, 0x0048, 0x0610, 0x0150, 0x0060, 0x0088,
    0x0FA0, 0x0007, 0x0026, 0x0006, 0x003A, 0x001B, 0x001A, 0x002A,
    0x000A, 0x000B, 0x0210, 0x0004, 0x0013, 0x0032, 0x0003, 0x001D,
    0x0012, 0x0190, 0x000D, 0x0015, 0x0005, 0x0019, 0x0008, 0x0078,
    0x00F0, 0x0070, 0x0290, 0x0410, 0x0010, 0x07A0, 0x0BA0, 0x03A0,
    0x0240, 0x1C40, 0x0C40, 0x1440, 0x0440, 0x1840, 0x0840, 0x1040,
    0x0040, 0x1F80, 0x0F80, 0x1780, 0x0780, 0x1B80, 0x0B80, 0x1380,
    0x0380, 0x1D80, 0x0D80, 0x1580, 0x0580, 0x1980, 0x0980, 0x1180,
    0x0180, 0x1E80, 0x0E80, 0x1680, 0x0680, 0x1A80, 0x0A80, 0x1280,
    0x0280, 0x1C80, 0x0C80, 0x1480, 0x0480, 0x1880, 0x0880, 0x1080,
    0x0080, 0x1F00, 0x0F00, 0x1700, 0x0700, 0x1B00, 0x0B00, 0x1300,
    0x0DA0, 0x05A0, 0x09A0, 0x01A0, 0x0EA0, 0x06A0, 0x0AA0, 0x02A0,
    0x0CA0, 0x04A0, 0x08A0, 0x00A0, 0x0F20, 0x0720, 0x0B20, 0x0320,
    0x0D20, 0x0520, 0x0920, 0x0120, 0x0E20, 0x0620, 0x0A20, 0x0220,
    0x0C20, 0x0420, 0x0820, 0x0020, 0x0FC0, 0x07C0, 0x0BC0, 0x03C0,
    0x0DC0, 0x05C0, 0x09C0, 0x01C0, 0x0EC0, 0x06C0, 0x0AC0, 0x02C0,
    0x0CC0, 0x04C0, 0x08C0, 0x00C0, 0x0F40, 0x0740, 0x0B40, 0x0340,
    0x0300, 0x0D40, 0x1D00, 0x0D00, 0x1500, 0x0540, 0x0500, 0x1900,
    0x0900, 0x0940, 0x1100, 0x0100, 0x1E00, 0x0E00, 0x0140, 0x1600,
    0x0600, 0x1A00, 0x0E40, 0x0640, 0x0A40, 0x0A00, 0x1200, 0x0200,
    0x1C00, 0x0C00, 0x1400, 0x0400, 0x1800, 0x0800, 0x1000, 0x0000,
]);
// Generated on the first time explode() is used.
let generatedDecodeTabs = false;
const DistPosCodes = new Uint8Array(0x100);
const LengthCodes = new Uint8Array(0x100);
// Same as above.
let generatedAscTabs = false;
const offs2C34 = new Uint8Array(0x100);
const offs2D34 = new Uint8Array(0x100);
const offs2E34 = new Uint8Array(0x80);
const offs2EB4 = new Uint8Array(0x100);
function GenDecodeTabs(positions, start_indexes, length_bits) {
    for (let i = 0, elements = start_indexes.length; i < elements; i++) {
        let length = 1 << length_bits[i];
        for (let index = start_indexes[i]; index < 0x100; index += length) {
            positions[index] = i;
        }
    }
}
function GenAscTabs() {
    let pChCodeAsc = 0xFF;
    let acc, add;
    for (let count = 0x00FF; pChCodeAsc >= 0; pChCodeAsc--, count--) {
        let pChBitsAsc = count;
        let bits_asc = ChBitsAsc[pChBitsAsc];
        if (bits_asc <= 8) {
            add = (1 << bits_asc);
            acc = ChCodeAsc[pChCodeAsc];
            do {
                offs2C34[acc] = count;
                acc += add;
            } while (acc < 0x100);
        }
        else if ((acc = (ChCodeAsc[pChCodeAsc] & 0xFF)) != 0) {
            offs2C34[acc] = 0xFF;
            if (ChCodeAsc[pChCodeAsc] & 0x3F) {
                bits_asc -= 4;
                ChBitsAsc[pChBitsAsc] = bits_asc;
                add = (1 << bits_asc);
                acc = ChCodeAsc[pChCodeAsc] >> 4;
                do {
                    offs2D34[acc] = count;
                    acc += add;
                } while (acc < 0x100);
            }
            else {
                bits_asc -= 6;
                ChBitsAsc[pChBitsAsc] = bits_asc;
                add = (1 << bits_asc);
                acc = ChCodeAsc[pChCodeAsc] >> 6;
                do {
                    offs2E34[acc] = count;
                    acc += add;
                } while (acc < 0x80);
            }
        }
        else {
            bits_asc -= 8;
            ChBitsAsc[pChBitsAsc] = bits_asc;
            add = (1 << bits_asc);
            acc = ChCodeAsc[pChCodeAsc] >> 8;
            do {
                offs2EB4[acc] = count;
                acc += add;
            } while (acc < 0x100);
        }
    }
}
function WasteBits(pWork, nBits) {
    if (nBits <= pWork.extra_bits) {
        pWork.extra_bits -= nBits;
        pWork.bit_buff >>= nBits;
        return PKDCL_OK;
    }
    pWork.bit_buff >>= pWork.extra_bits;
    if (pWork.in_pos === pWork.in_buff.byteLength) {
        return PKDCL_STREAM_END;
    }
    pWork.bit_buff |= (pWork.in_buff[pWork.in_pos++] << 8);
    pWork.bit_buff >>= (nBits - pWork.extra_bits);
    pWork.extra_bits = (pWork.extra_bits - nBits) + 8;
    return PKDCL_OK;
}
function DecodeLit(pWork) {
    if (pWork.bit_buff & 1) {
        if (WasteBits(pWork, 1)) {
            return 0x306;
        }
        let length_code = LengthCodes[pWork.bit_buff & 0xFF];
        if (WasteBits(pWork, LenBits[length_code])) {
            return 0x306;
        }
        let extra_length_bits;
        if ((extra_length_bits = ExLenBits[length_code]) != 0) {
            let extra_length = pWork.bit_buff & ((1 << extra_length_bits) - 1);
            if (WasteBits(pWork, extra_length_bits)) {
                if ((length_code + extra_length) != 0x10E) {
                    return 0x306;
                }
            }
            length_code = LenBase[length_code] + extra_length;
        }
        return length_code + 0x100;
    }
    if (WasteBits(pWork, 1)) {
        return 0x306;
    }
    if (pWork.ctype == CMP_BINARY) {
        let uncompressed_byte = pWork.bit_buff & 0xFF;
        if (WasteBits(pWork, 8)) {
            return 0x306;
        }
        return uncompressed_byte;
    }
    let value;
    if (pWork.bit_buff & 0xFF) {
        value = offs2C34[pWork.bit_buff & 0xFF];
        if (value == 0xFF) {
            if (pWork.bit_buff & 0x3F) {
                if (WasteBits(pWork, 4)) {
                    return 0x306;
                }
                value = offs2D34[pWork.bit_buff & 0xFF];
            }
            else {
                if (WasteBits(pWork, 6)) {
                    return 0x306;
                }
                value = offs2E34[pWork.bit_buff & 0x7F];
            }
        }
    }
    else {
        if (WasteBits(pWork, 8)) {
            return 0x306;
        }
        value = offs2EB4[pWork.bit_buff & 0xFF];
    }
    return WasteBits(pWork, ChBitsAsc[value]) ? 0x306 : value;
}
function DecodeDist(pWork, rep_length) {
    let dist_pos_code = DistPosCodes[pWork.bit_buff & 0xFF];
    let dist_pos_bits = DistBits[dist_pos_code];
    if (WasteBits(pWork, dist_pos_bits)) {
        return 0;
    }
    let distance;
    if (rep_length == 2) {
        distance = (dist_pos_code << 2) | (pWork.bit_buff & 0x03);
        if (WasteBits(pWork, 2)) {
            return 0;
        }
    }
    else {
        distance = (dist_pos_code << pWork.dsize_bits) | (pWork.bit_buff & pWork.dsize_mask);
        if (WasteBits(pWork, pWork.dsize_bits)) {
            return 0;
        }
    }
    return distance + 1;
}
function Expand(pWork) {
    let next_literal;
    while ((next_literal = DecodeLit(pWork)) < 0x305) {
        if (next_literal >= 0x100) {
            let rep_length = next_literal - 0xFE;
            let minus_dist;
            if ((minus_dist = DecodeDist(pWork, rep_length)) == 0) {
                return 0x306;
            }
            let target = pWork.outputPos;
            let source = target - minus_dist;
            pWork.outputPos += rep_length;
            while (rep_length-- > 0) {
                pWork.out_buff[target++] = pWork.out_buff[source++];
            }
        }
        else {
            pWork.out_buff[pWork.outputPos++] = next_literal;
        }
    }
    return next_literal;
}
function explode(bytes) {
    let pWork = new TDcmpStruct(bytes);
    if (pWork.in_buff.byteLength <= 4) {
        throw new Error('Bad data');
    }
    pWork.ctype = pWork.in_buff[0];
    pWork.dsize_bits = pWork.in_buff[1];
    pWork.bit_buff = pWork.in_buff[2];
    pWork.extra_bits = 0;
    pWork.in_pos = 3;
    if (4 > pWork.dsize_bits || pWork.dsize_bits > 6) {
        throw new Error('Invalid dictionary size');
    }
    pWork.dsize_mask = 0xFFFF >> (0x10 - pWork.dsize_bits);
    if (pWork.ctype !== CMP_BINARY) {
        if (pWork.ctype !== CMP_ASCII) {
            throw new Error('Invalid mode');
        }
        if (!generatedAscTabs) {
            GenAscTabs();
            generatedAscTabs = true;
        }
    }
    if (!generatedDecodeTabs) {
        GenDecodeTabs(LengthCodes, LenCode, LenBits);
        GenDecodeTabs(DistPosCodes, DistCode, DistBits);
        generatedDecodeTabs = true;
    }
    if (Expand(pWork) === 0x306) {
        throw new Error('Error while expanding');
    }
    return new Uint8Array(pWork.out_buff);
}

/**
 * Search for the MPQ header - MPQ\x1A.
 * The header can be on any 512 bytes boundry offset.
 */
function searchHeader(bytes) {
    let offset = -1;
    for (let i = 0, l = Math.ceil(bytes.byteLength / 512); i < l; i++) {
        let base = i * 512;
        // Test 'MPQ\x1A'.
        if (bytes[base] === 77 && bytes[base + 1] === 80 && bytes[base + 2] === 81 && bytes[base + 3] === 26) {
            offset = base;
        }
    }
    return offset;
}
/**
 * Checks whether the given buffer is either a Warcraft 3 map or otherwise a generic MPQ archive.
 */
function isArchive(bytes) {
    // Check for the map identifier - HM3W
    if (bytes[0] === 72 && bytes[1] === 77 && bytes[2] === 51 && bytes[3] === 87) {
        return true;
    }
    // Look for an MPQ header.
    return searchHeader(bytes) !== -1;
}

/**
 * A MPQ file.
 */
class MpqFile {
    constructor(archive, hash, block, rawBuffer, buffer) {
        this.rawBuffer = null;
        this.buffer = null;
        let headerOffset = archive.headerOffset;
        this.archive = archive;
        this.c = archive.c;
        this.name = `File${`${hash.blockIndex}`.padStart(8, '0')}`;
        this.nameResolved = false;
        this.hash = hash;
        this.block = block;
        if (rawBuffer) {
            this.rawBuffer = rawBuffer.slice(headerOffset + block.offset, headerOffset + block.offset + block.compressedSize);
        }
        if (buffer) {
            this.buffer = buffer;
        }
    }
    /**
     * Gets this file's data as a Uint8Array.
     *
     * Decodes the file if needed.
     *
     * If the file could not be decoded, null is returned.
     */
    bytes() {
        // Decode if needed
        if (this.buffer === null) {
            this.decode();
        }
        return this.buffer;
    }
    /**
     * Gets this file's data as an ArrayBuffer.
     *
     * Decodes the file if needed.
     *
     * If the file could not be decoded, null is returned.
     */
    arrayBuffer() {
        let bytes = this.bytes();
        if (bytes) {
            return bytes.buffer;
        }
        return null;
    }
    /**
     * Gets this file's data as a UTF8 string.
     *
     * Decodes the file if needed.
     *
     * If the file could not be decoded, null is returned.
     */
    text() {
        let bytes = this.bytes();
        if (bytes) {
            return decodeUtf8(bytes);
        }
        return null;
    }
    /**
     * Changes the buffer of this file.
     *
     * Does nothing if the archive is in readonly mode.
     */
    set(buffer) {
        if (this.archive.readonly) {
            return false;
        }
        let hash = this.hash;
        let block = this.block;
        // Reset the hash.
        hash.locale = 0;
        hash.platform = 0;
        // Reset the block.
        block.compressedSize = 0;
        block.normalSize = buffer.byteLength;
        block.flags = 0;
        this.buffer = buffer;
        this.rawBuffer = null;
        return true;
    }
    /**
     * Deletes this file.
     *
     * Using the file after it was deleted will result in undefined behavior.
     *
     * Does nothing if the archive is in readonly mode.
     */
    delete() {
        if (this.archive.readonly) {
            return false;
        }
        let archive = this.archive;
        let hash = this.hash;
        let blockIndex = hash.blockIndex;
        hash.delete();
        for (let hash of archive.hashTable.entries) {
            if (hash.blockIndex < HASH_ENTRY_DELETED && hash.blockIndex > blockIndex) {
                hash.blockIndex -= 1;
            }
        }
        archive.blockTable.entries.splice(blockIndex, 1);
        archive.files.splice(blockIndex, 1);
        return true;
    }
    /**
     * Renames this file.
     *
     * Note that this sets the current file's hash's status to being deleted, rather than removing it.
     * This is due to the way the search algorithm works.
     *
     * Does nothing if the archive is in readonly mode.
     */
    rename(newName) {
        if (this.archive.readonly) {
            return false;
        }
        let hash = this.hash;
        let locale = hash.locale;
        let platform = hash.platform;
        let blockIndex = hash.blockIndex;
        // First delete the current hash.
        // This will allow its entry to be reused in case it's the only empty/deleted entry in the hashtable.
        hash.delete();
        let newHash = this.archive.hashTable.add(newName, blockIndex);
        newHash.locale = locale;
        newHash.platform = platform;
        this.name = newName;
        this.nameResolved = true;
        this.hash = newHash;
        return true;
    }
    /**
     * Decode this file.
     */
    decode() {
        if (!this.rawBuffer) {
            return;
        }
        let archive = this.archive;
        let block = this.block;
        let c = archive.c;
        let encryptionKey = c.computeFileKey(this.name, block);
        let data = this.rawBuffer;
        let flags = block.flags;
        // One buffer of raw data.
        // I don't know why having no flags means it's a chunk of memory rather than sectors.
        // After all, there is no flag to say there are indeed sectors.
        if (flags === FILE_EXISTS) {
            this.buffer = data.slice(0, block.normalSize);
        }
        else if (flags & FILE_SINGLE_UNIT) {
            // One buffer of possibly encrypted and/or compressed data.
            // Read the sector
            let sector;
            // If this block is encrypted, decrypt the sector.
            if (flags & FILE_ENCRYPTED) {
                sector = c.decryptBlock(data.slice(0, block.compressedSize), encryptionKey);
            }
            else {
                sector = data.subarray(0, block.compressedSize);
            }
            // If this block is compressed, decompress the sector.
            // Otherwise, copy the sector as-is.
            if (flags & FILE_COMPRESSED) {
                sector = this.decompressSector(sector, block.normalSize);
            }
            else {
                sector = sector.slice();
            }
            if (!sector) {
                return false;
            }
            this.buffer = sector;
        }
        else {
            // One or more sectors of possibly encrypted and/or compressed data.
            let sectorCount = Math.ceil(block.normalSize / archive.sectorSize);
            // Alocate a buffer for the uncompressed block size
            let buffer = new Uint8Array(block.normalSize);
            // Get the sector offsets
            let sectorOffsets = new Uint32Array(data.buffer, 0, sectorCount + 1);
            // If this file is encrypted, copy the sector offsets and decrypt them.
            if (flags & FILE_ENCRYPTED) {
                sectorOffsets = c.decryptBlock(sectorOffsets.slice(), encryptionKey - 1);
            }
            let start = sectorOffsets[0];
            let end = sectorOffsets[1];
            let offset = 0;
            for (let i = 0; i < sectorCount; i++) {
                let sector;
                // If this file is encrypted, copy the sector and decrypt it.
                // Otherwise a view can be used directly.
                if (flags & FILE_ENCRYPTED) {
                    sector = c.decryptBlock(data.slice(start, end), encryptionKey + i);
                }
                else {
                    sector = data.subarray(start, end);
                }
                // Decompress the sector
                if (flags & FILE_COMPRESSED) {
                    let uncompressedSize = archive.sectorSize;
                    // If this is the last sector, its uncompressed size might not be the size of a sector.
                    if (block.normalSize - offset < uncompressedSize) {
                        uncompressedSize = block.normalSize - offset;
                    }
                    sector = this.decompressSector(sector, uncompressedSize);
                }
                // If failed to decompress the sector, stop.
                if (!sector) {
                    return false;
                }
                // Add the sector bytes to the buffer
                buffer.set(sector, offset);
                offset += sector.byteLength;
                // Prepare for the next sector
                if (i < sectorCount) {
                    start = end;
                    end = sectorOffsets[i + 2];
                }
            }
            this.buffer = buffer;
        }
        // If the archive is in read-only mode, the raw buffer isn't needed anymore, so free the memory.
        if (archive.readonly) {
            this.rawBuffer = null;
        }
        return true;
    }
    decompressSector(bytes, decompressedSize) {
        // If the size of the data is the same as its decompressed size, it's not compressed.
        if (bytes.byteLength === decompressedSize) {
            return bytes;
        }
        else {
            let compressionMask = bytes[0];
            if (compressionMask & COMPRESSION_BZIP2) {
                console.warn(`File ${this.name}, compression type 'bzip2' not supported`);
                return null;
            }
            if (compressionMask & COMPRESSION_IMPLODE) {
                try {
                    bytes = explode(bytes.subarray(1));
                }
                catch (e) {
                    console.warn(`File ${this.name}, failed to decompress with 'explode': ${e}`);
                    return null;
                }
            }
            if (compressionMask & COMPRESSION_DEFLATE) {
                try {
                    bytes = pako_1.inflate(bytes.subarray(1));
                }
                catch (e) {
                    console.warn(`File ${this.name}, failed to decompress with 'zlib': ${e}`);
                    return null;
                }
            }
            if (compressionMask & COMPRESSION_HUFFMAN) {
                console.warn(`File ${this.name}, compression type 'huffman' not supported`);
                return null;
            }
            if (compressionMask & COMPRESSION_ADPCM_STEREO) {
                console.warn(`File ${this.name}, compression type 'adpcm stereo' not supported`);
                return null;
            }
            if (compressionMask & COMPRESSION_ADPCM_MONO) {
                console.warn(`File ${this.name}, compression type 'adpcm mono' not supported`);
                return null;
            }
            return bytes;
        }
    }
    /**
     * Encode this file.
     * Archives (maps or generic MPQs) are stored uncompressed in one chunk.
     * Other files are always stored in sectors, except when a file is smaller than a sector.
     * Sectors themselves are always compressed, except when the result is smaller than the uncompressed data.
     */
    encode() {
        if (this.buffer !== null && this.rawBuffer === null) {
            let data = this.buffer;
            if (isArchive(data)) {
                this.rawBuffer = this.buffer;
                this.block.compressedSize = this.buffer.byteLength;
                this.block.flags = FILE_EXISTS;
            }
            else {
                let sectorSize = this.archive.sectorSize;
                let sectorCount = Math.ceil(data.byteLength / sectorSize);
                let offsets = new Uint32Array(sectorCount + 1);
                let offset = offsets.byteLength;
                let sectors = [];
                let compression = [];
                // First offset is right after the offsets list.
                offsets[0] = offset;
                for (let i = 0; i < sectorCount; i++) {
                    let sectorOffset = i * sectorSize;
                    let sector = data.subarray(sectorOffset, sectorOffset + sectorSize);
                    let size = sector.byteLength;
                    let compressed = pako_1.deflate(sector);
                    let isCompressed = false;
                    // If the compressed size of the sector is smaller than the uncompressed, use the compressed data.
                    // +1 because of the compression mask byte.
                    if (compressed.byteLength + 1 < size) {
                        sector = compressed;
                        size = compressed.byteLength + 1;
                        isCompressed = true;
                    }
                    offset += size;
                    offsets[i + 1] = offset;
                    sectors[i] = sector;
                    compression[i] = isCompressed;
                }
                // Only use the compressed data if it's actually smaller than the uncompressed data.
                if (offset < data.byteLength) {
                    let rawBuffer = new Uint8Array(offset);
                    // Write the offsets list.
                    rawBuffer.set(new Uint8Array(offsets.buffer));
                    offset = offsets.byteLength;
                    for (let i = 0; i < sectorCount; i++) {
                        // If this sector is compressed, set it to zlib.
                        if (compression[i]) {
                            rawBuffer[offset] = 2;
                            offset += 1;
                        }
                        // Write the sector.
                        let sector = sectors[i];
                        rawBuffer.set(sector, offset);
                        offset += sector.byteLength;
                    }
                    this.rawBuffer = rawBuffer;
                    this.block.compressedSize = rawBuffer.byteLength;
                    this.block.flags = (FILE_EXISTS | FILE_COMPRESSED) >>> 0;
                }
                else {
                    this.rawBuffer = this.buffer;
                    this.block.compressedSize = this.buffer.byteLength;
                    this.block.flags = FILE_EXISTS;
                }
            }
        }
    }
    /**
     * Decrypt this file and encrypt it back, with a new offset in the archive.
     * This is used for files that use FILE_OFFSET_ADJUSTED_KEY, which are encrypted with a key that depends on their offset.
     */
    reEncrypt(offset) {
        if (!this.rawBuffer) {
            return false;
        }
        let archive = this.archive;
        let block = this.block;
        let c = archive.c;
        let bytes = this.rawBuffer;
        let flags = block.flags;
        let encryptionKey = c.computeFileKey(this.name, block);
        block.offset = offset;
        let newEncryptionKey = c.computeFileKey(this.name, block);
        if (flags & FILE_SINGLE_UNIT) {
            // Decrypt the chunk with the old key.
            c.decryptBlock(bytes, encryptionKey);
            // Encrypt the chunk with the new key.
            c.encryptBlock(bytes, newEncryptionKey);
        }
        else {
            let sectorCount = Math.ceil(block.normalSize / archive.sectorSize);
            // Get the sector offsets
            let sectorOffsets = new Uint32Array(bytes.buffer, 0, sectorCount + 1);
            // Decrypt the sector offsets with the old key.
            c.decryptBlock(sectorOffsets, encryptionKey - 1);
            let start = sectorOffsets[0];
            let end = sectorOffsets[1];
            for (let i = 0; i < sectorCount; i++) {
                let sector = bytes.subarray(start, end);
                // Decrypt the chunk with the old key.
                c.decryptBlock(sector, encryptionKey + i);
                // Encrypt the chunk with the new key.
                c.encryptBlock(sector, newEncryptionKey + i);
                // Prepare for the next sector
                if (i < sectorCount) {
                    start = end;
                    end = sectorOffsets[i + 2];
                }
            }
            // Encrypt the sector offsets with the new key.
            c.encryptBlock(sectorOffsets, newEncryptionKey - 1);
        }
        return true;
    }
    /**
     * The offset of the file has been recalculated.
     * If the offset is different, and this file uses FILE_OFFSET_ADJUSTED_KEY encryption, it must be re-encrypted with the new offset.
     */
    offsetChanged(offset) {
        let block = this.block;
        if (block.offset !== offset && block.flags & FILE_OFFSET_ADJUSTED_KEY) {
            if (this.nameResolved) {
                return this.reEncrypt(offset);
            }
            return false;
        }
        block.offset = offset;
        return true;
    }
}

/**
 * A MPQ hash.
 */
class MpqHash {
    constructor() {
        this.nameA = 0xFFFFFFFF;
        this.nameB = 0xFFFFFFFF;
        this.locale = 0xFFFF;
        this.platform = 0xFFFF;
        this.blockIndex = HASH_ENTRY_EMPTY;
    }
    load(bytes) {
        let localePlatform = bytes[2];
        this.nameA = bytes[0];
        this.nameB = bytes[1];
        this.locale = localePlatform & 0x0000FFFF;
        this.platform = localePlatform >>> 16;
        this.blockIndex = bytes[3];
    }
    copy(hash) {
        this.nameA = hash.nameA;
        this.nameB = hash.nameB;
        this.locale = hash.locale;
        this.platform = hash.platform;
        this.blockIndex = hash.blockIndex;
    }
    save(bytes) {
        bytes[0] = this.nameA;
        bytes[1] = this.nameB;
        bytes[2] = (this.locale << 16) | this.platform;
        bytes[3] = this.blockIndex;
    }
    delete() {
        this.nameA = 0xFFFFFFFF;
        this.nameB = 0xFFFFFFFF;
        this.locale = 0xFFFF;
        this.platform = 0xFFFF;
        this.blockIndex = HASH_ENTRY_DELETED;
    }
}

/**
 * A MPQ hash table.
 */
class MpqHashTable {
    constructor(c) {
        this.c = c;
        this.entries = [];
        // Minimum size
        this.addEmpties(4);
    }
    clear() {
        this.entries.length = 0;
    }
    addEmpties(howMany) {
        for (let i = 0; i < howMany; i++) {
            this.entries.push(new MpqHash());
        }
    }
    getInsertionIndex(name) {
        let entries = this.entries;
        let offset = this.c.hash(name, HASH_TABLE_INDEX) & (entries.length - 1);
        for (let i = 0, l = entries.length; i < l; i++) {
            let index = (i + offset) % l;
            let hash = entries[index];
            if (hash.platform === 0xFFFF) {
                return index;
            }
        }
        return -1;
    }
    add(name, blockIndex) {
        let insertionIndex = this.getInsertionIndex(name);
        if (insertionIndex !== -1) {
            let hash = this.entries[insertionIndex];
            hash.nameA = this.c.hash(name, HASH_NAME_A);
            hash.nameB = this.c.hash(name, HASH_NAME_B);
            hash.locale = 0;
            hash.platform = 0;
            hash.blockIndex = blockIndex;
            return hash;
        }
    }
    load(bytes) {
        let entriesCount = bytes.byteLength / 16;
        let uint32array = new Uint32Array(this.c.decryptBlock(bytes, HASH_TABLE_KEY).buffer);
        let offset = 0;
        // Clear the table and add the needed empties.
        this.clear();
        this.addEmpties(entriesCount);
        for (let hash of this.entries) {
            hash.load(uint32array.subarray(offset, offset + 4));
            offset += 4;
        }
    }
    save(bytes) {
        let uint32array = new Uint32Array(this.entries.length * 4);
        let offset = 0;
        for (let hash of this.entries) {
            hash.save(uint32array.subarray(offset, offset + 4));
            offset += 4;
        }
        let uint8array = new Uint8Array(uint32array.buffer);
        this.c.encryptBlock(uint8array, HASH_TABLE_KEY);
        bytes.set(uint8array);
    }
    get(name) {
        let c = this.c;
        let entries = this.entries;
        let offset = c.hash(name, HASH_TABLE_INDEX) & (entries.length - 1);
        let nameA = c.hash(name, HASH_NAME_A);
        let nameB = c.hash(name, HASH_NAME_B);
        for (let i = 0, l = entries.length; i < l; i++) {
            let hash = entries[(i + offset) % l];
            if (nameA === hash.nameA && nameB === hash.nameB) {
                return hash;
            }
            else if (hash.blockIndex === 0xFFFFFFFF) {
                return null;
            }
        }
        return null;
    }
}

/**
 * MoPaQ archive (MPQ) version 0.
 */
class MpqArchive {
    constructor() {
        this.readonly = false;
        this.headerOffset = 0;
        this.sectorSize = 4096;
        this.c = new MpqCrypto();
        this.hashTable = new MpqHashTable(this.c);
        this.blockTable = new BlockTable(this.c);
        this.files = [];
    }
    /**
     * Load an existing archive.
     *
     * Note that this clears the archive from whatever it had in it before.
     */
    load(buffer, readonly = false) {
        let bytes = bytesOf(buffer);
        this.readonly = readonly;
        // let fileSize = buffer.byteLength;
        let headerOffset = searchHeader(bytes);
        if (headerOffset === -1) {
            throw new Error('No MPQ header');
        }
        // Read the header.
        let uint32array = new Uint32Array(bytes.buffer, headerOffset, 8);
        // let headerSize = uint32array[1];
        // let archiveSize = uint32array[2];
        let formatVersionSectorSize = uint32array[3];
        // let formatVersion = formatVersionSectorSize & 0x0000FFFF;
        let hashPos = numberToUint32(uint32array[4] + headerOffset); // Whoever thought of MoonLight, clever!
        let blockPos = numberToUint32(uint32array[5] + headerOffset);
        let hashSize = uint32array[6];
        let blockSize = uint32array[7];
        // There can only be as many or less blocks as there are hashes.
        // Therefore, if the file is reporting too many blocks, cap the actual blocks read to the amount of hashes.
        if (blockSize > hashSize) {
            blockSize = hashSize;
        }
        this.headerOffset = headerOffset;
        this.sectorSize = 512 * (1 << (formatVersionSectorSize >>> 16)); // Generally 4096
        // Read the hash table.
        // Also clears any existing entries.
        // Have to copy the data, because hashPos is not guaranteed to be a multiple of 4.
        this.hashTable.load(bytes.slice(hashPos, hashPos + hashSize * 16));
        // Read the block table.
        // Also clears any existing entries.
        // Have to copy the data, because blockPos is not guaranteed to be a multiple of 4.
        this.blockTable.load(bytes.slice(blockPos, blockPos + blockSize * 16));
        // Clear any existing files.
        this.files.length = 0;
        // Read the files.
        for (let hash of this.hashTable.entries) {
            let blockIndex = hash.blockIndex;
            // If the file wasn't deleted, load it.
            if (blockIndex < HASH_ENTRY_DELETED) {
                let file = new MpqFile(this, hash, this.blockTable.entries[blockIndex], bytes, null);
                this.files[blockIndex] = file;
            }
        }
        // Get internal files to fill the file names.
        let listfile = this.get('(listfile)');
        this.get('(attributes)');
        this.get('(signature)');
        // If there is a listfile, use all of the file names in it.
        if (listfile) {
            let list = listfile.text();
            if (list) {
                for (let name of list.split('\r\n')) {
                    // get() internally also sets the file's name to the given one.
                    this.get(name);
                }
            }
        }
    }
    /**
     * Save this archive.
     *
     * Returns null when...
     *
     *     1) The archive is in readonly mode.
     *     2) The offset of a file encrypted with FILE_OFFSET_ADJUSTED_KEY changed, and the file name is unknown.
     */
    save() {
        if (this.readonly) {
            return null;
        }
        let headerSize = 32;
        // Delete the internal attributes file.
        // The attributes might (and do in the case of World Editor generated maps) contain CRC checksums for the internal files.
        // If any of these files is edited in any way, the map will be considered corrupted.
        // Therefore, delete the file, and nothing will be corrupted.
        // As far as I can tell, there is no real reason to keep (and update) any of the file attributes.
        // It's not like Warcraft 3 has some database of checksums that it checks against.
        // I assume it does have a database for the Battle.net ladder maps.
        // If at any point it becomes known to me that it is indeed needed, I will add support for (attributes).
        this.delete('(attributes)');
        // Some archives have empty blocks in them.
        // That is, blocks that take up memory, but have no actual valid data in them (as far as the archive is concerned).
        // I am not sure why they exist - maybe someone deleted a file's entry and was too lazy to rebuild the archive.
        // This removes such blocks of memory from the archive.
        this.saveMemory();
        // Set the listfile.
        this.setListFile();
        // Reset the file offsets.
        let offset = headerSize;
        for (let file of this.files) {
            // If the file's offset changed, and it is encrypted with a key that depends on its offset,
            // it needs to be decryped with it's current key, and encryped with the new key.
            if (!file.offsetChanged(offset)) {
                return null;
            }
            // If the file needs to be encoded, do it.
            file.encode();
            offset += file.block.compressedSize;
        }
        let hashTable = this.hashTable;
        let blockTable = this.blockTable;
        let hashes = hashTable.entries.length;
        let blocks = blockTable.entries.length;
        let filesSize = offset - headerSize;
        let archiveSize = headerSize + filesSize + hashes * 16 + blocks * 16;
        let hashPos = headerSize + filesSize;
        let blockPos = hashPos + hashes * 16;
        let bytes = new Uint8Array(archiveSize);
        let uint32array = new Uint32Array(bytes.buffer, 0, 8);
        // Write the header.
        uint32array[0] = MAGIC;
        uint32array[1] = headerSize;
        uint32array[2] = archiveSize;
        uint32array[3] = Math.log2(this.sectorSize / 512) << 16; // The version is always 0, so ignore it.
        uint32array[4] = hashPos;
        uint32array[5] = blockPos;
        uint32array[6] = hashes;
        uint32array[7] = blocks;
        offset = headerSize;
        // Write the files.
        for (let file of this.files) {
            if (file.rawBuffer) {
                bytes.set(file.rawBuffer, offset);
            }
            offset += file.block.compressedSize;
        }
        // Write the hash table.
        hashTable.save(bytes.subarray(offset, offset + hashTable.entries.length * 16));
        offset += hashTable.entries.length * 16;
        // Write the block table.
        blockTable.save(bytes.subarray(offset, offset + blockTable.entries.length * 16));
        return bytes;
    }
    /**
     * Some MPQs have empty memory chunks in them, left over from files that were deleted.
     * This function searches for such chunks, and removes them.
     *
     * Note that it is called automatically by save().
     *
     * Does nothing if the archive is in readonly mode.
     */
    saveMemory() {
        if (this.readonly) {
            return 0;
        }
        let blocks = this.blockTable.entries;
        let hashes = this.hashTable.entries;
        let i = blocks.length;
        let saved = 0;
        while (i--) {
            let block = blocks[i];
            // Remove blocks with no data.
            if (block.normalSize === 0) {
                this.removeBlock(i);
                saved += block.compressedSize;
            }
            else {
                let used = false;
                for (let hash of hashes) {
                    if (hash.blockIndex === i) {
                        used = true;
                    }
                }
                // Remove blocks that are not used.
                if (!used) {
                    this.removeBlock(i);
                    saved += block.compressedSize;
                }
            }
        }
        return saved;
    }
    removeBlock(blockIndex) {
        for (let hash of this.hashTable.entries) {
            if (hash.blockIndex < HASH_ENTRY_DELETED && hash.blockIndex > blockIndex) {
                hash.blockIndex -= 1;
            }
        }
        this.blockTable.entries.splice(blockIndex, 1);
    }
    /**
     * Gets a list of the file names in the archive.
     *
     * Note that files loaded from an existing archive, without resolved names, will be named FileXXXXXXXX.
     */
    getFileNames() {
        let names = [];
        for (let file of this.files) {
            if (file && file.name !== '') {
                names.push(file.name);
            }
        }
        return names;
    }
    /**
     * Sets the list file with all of the resolved file names.
     *
     * Does nothing if the archive is in readonly mode.
     */
    setListFile() {
        if (this.readonly) {
            return false;
        }
        // Add the listfile, possibly overriding an existing one.
        return this.set('(listfile)', this.getFileNames().join('\r\n'));
    }
    /**
     * Adds a file to this archive.
     * If the file already exists, its buffer will be set.
     *
     * Does nothing if the archive is in readonly mode.
     */
    set(name, buffer) {
        if (this.readonly) {
            return false;
        }
        let bytes;
        if (buffer instanceof ArrayBuffer) {
            bytes = new Uint8Array(buffer);
        }
        else if (buffer instanceof Uint8Array) {
            bytes = buffer;
        }
        else {
            bytes = encodeUtf8(buffer);
        }
        let file = this.get(name);
        // If the file already exists, change the data.
        if (file) {
            file.set(bytes);
        }
        else {
            let blockIndex = this.blockTable.entries.length;
            let hash = this.hashTable.add(name, blockIndex);
            if (!hash) {
                return false;
            }
            let block = this.blockTable.add(bytes);
            file = new MpqFile(this, hash, block, null, bytes);
            file.name = name;
            file.nameResolved = true;
            this.files[blockIndex] = file;
        }
        return true;
    }
    /**
     * Gets a file from this archive.
     * If the file doesn't exist, null is returned.
     */
    get(name) {
        let hash = this.hashTable.get(name);
        if (hash) {
            let blockIndex = hash.blockIndex;
            // Check if the block exists.
            if (blockIndex < HASH_ENTRY_DELETED) {
                let file = this.files[blockIndex];
                if (file) {
                    // Save the name in case it wasn't already resolved.
                    file.name = name;
                    file.nameResolved = true;
                    return file;
                }
            }
        }
        return null;
    }
    /**
     * Checks if a file exists.
     *
     * Prefer to use get() if you are going to use get() afterwards anyway.
     */
    has(name) {
        return !!this.get(name);
    }
    /**
     * Deletes a file from this archive.
     *
     * Does nothing if...
     *
     *     1) The archive is in readonly mode.
     *     2) The file does not exist.
     */
    delete(name) {
        if (this.readonly) {
            return false;
        }
        let file = this.get(name);
        if (!file) {
            return false;
        }
        file.delete();
        return true;
    }
    /**
     * Renames a file.
     *
     * Does nothing if...
     *
     *     1) The archive is in readonly mode.
     *     2) The file does not exist.
     *
     * Note that this sets the current file's hash's status to being deleted, rather than removing it.
     * This is due to the way the search algorithm works.
     */
    rename(name, newName) {
        if (this.readonly) {
            return false;
        }
        let file = this.get(name);
        if (!file) {
            return false;
        }
        file.rename(newName);
        return true;
    }
    /**
     * Resizes the hashtable to the nearest power of two equal to or bigger than the given size.
     *
     * Generally speaking, the bigger the hashtable is, the quicker insertions/searches are, at the cost of added memory.
     *
     * Does nothing if...
     *
     *     1) The archive is in readonly mode.
     *     2) The calculated size is smaller than the amount of files in the archive.
     *     3) Not all of the file names in the archive are resolved.
     */
    resizeHashtable(size) {
        if (this.readonly) {
            return false;
        }
        size = Math.max(4, powerOfTwo(size));
        let files = this.files;
        // Can't resize to a size smaller than the existing files.
        if (files.length > size) {
            return false;
        }
        // If not all file names are known, don't resize.
        // The insertion algorithm depends on the names.
        for (let file of files) {
            if (!file.nameResolved) {
                return false;
            }
        }
        let hashTable = this.hashTable;
        let entries = hashTable.entries;
        let oldEntries = entries.slice();
        // Clear the entries.
        hashTable.clear();
        // Add empty entries.
        hashTable.addEmpties(size);
        // Go over all of the old entries, and copy them into the new entries.
        for (let hash of oldEntries) {
            if (hash.blockIndex !== HASH_ENTRY_EMPTY) {
                let file = files[hash.blockIndex];
                let insertionIndex = hashTable.getInsertionIndex(file.name);
                entries[insertionIndex].copy(hash);
            }
        }
        return true;
    }
}

/**
 * An import.
 */
class Import {
    constructor() {
        this.isCustom = 0;
        this.path = '';
    }
    load(stream) {
        this.isCustom = stream.readUint8();
        this.path = stream.readNull();
    }
    save(stream) {
        stream.writeUint8(this.isCustom);
        stream.writeNull(this.path);
    }
    getByteLength() {
        return 2 + byteLengthUtf8(this.path);
    }
}

/**
 * war3map.imp - the import file.
 */
class War3MapImp {
    constructor() {
        this.version = 1;
        this.entries = new Map();
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readUint32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let entry = new Import();
            entry.load(stream);
            if (entry.isCustom) {
                this.entries.set(entry.path, entry);
            }
            else {
                this.entries.set(`war3mapimported\\${entry.path}`, entry);
            }
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeUint32(this.version);
        stream.writeUint32(this.entries.size);
        for (let entry of this.entries.values()) {
            entry.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 8;
        for (let entry of this.entries.values()) {
            size += entry.getByteLength();
        }
        return size;
    }
    set(path) {
        if (!this.entries.has(path)) {
            let entry = new Import();
            entry.isCustom = 10;
            entry.path = path;
            this.entries.set(path, entry);
            return true;
        }
        return false;
    }
    has(path) {
        return this.entries.has(path);
    }
    delete(path) {
        return this.entries.delete(path);
    }
    rename(path, newPath) {
        let entry = this.entries.get(path);
        if (entry) {
            entry.isCustom = 10;
            entry.path = newPath;
            return true;
        }
        return false;
    }
}

/**
 * A modification.
 */
class Modification {
    constructor() {
        this.id = '\0\0\0\0';
        this.variableType = 0;
        this.levelOrVariation = 0;
        this.dataPointer = 0;
        this.value = 0;
        this.u1 = 0;
    }
    load(stream, useOptionalInts) {
        this.id = stream.readBinary(4);
        this.variableType = stream.readInt32();
        if (useOptionalInts) {
            this.levelOrVariation = stream.readInt32();
            this.dataPointer = stream.readInt32();
        }
        if (this.variableType === 0) {
            this.value = stream.readInt32();
        }
        else if (this.variableType === 1 || this.variableType === 2) {
            this.value = stream.readFloat32();
        }
        else if (this.variableType === 3) {
            this.value = stream.readNull();
        }
        else {
            throw new Error(`Modification: unknown variable type ${this.variableType}`);
        }
        this.u1 = stream.readInt32();
    }
    save(stream, useOptionalInts) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.variableType);
        if (useOptionalInts) {
            stream.writeInt32(this.levelOrVariation);
            stream.writeInt32(this.dataPointer);
        }
        if (this.variableType === 0) {
            stream.writeInt32(this.value);
        }
        else if (this.variableType === 1 || this.variableType === 2) {
            stream.writeFloat32(this.value);
        }
        else if (this.variableType === 3) {
            stream.writeNull(this.value);
        }
        else {
            throw new Error(`Modification: unknown variable type ${this.variableType}`);
        }
        stream.writeInt32(this.u1);
    }
    getByteLength(useOptionalInts) {
        let size = 12;
        if (useOptionalInts) {
            size += 8;
        }
        if (this.variableType === 3) {
            size += byteLengthUtf8(this.value) + 1;
        }
        else {
            size += 4;
        }
        return size;
    }
}

/**
 * A modified object.
 */
class ModifiedObject {
    constructor() {
        this.oldId = '\0\0\0\0';
        this.newId = '\0\0\0\0';
        this.modifications = [];
    }
    load(stream, useOptionalInts) {
        this.oldId = stream.readBinary(4);
        this.newId = stream.readBinary(4);
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let modification = new Modification();
            modification.load(stream, useOptionalInts);
            this.modifications[i] = modification;
        }
    }
    save(stream, useOptionalInts) {
        if (this.oldId !== '\0\0\0\0') {
            stream.writeBinary(this.oldId);
        }
        else {
            stream.writeUint32(0);
        }
        if (this.newId !== '\0\0\0\0') {
            stream.writeBinary(this.newId);
        }
        else {
            stream.writeUint32(0);
        }
        stream.writeUint32(this.modifications.length);
        for (let modification of this.modifications) {
            modification.save(stream, useOptionalInts);
        }
    }
    getByteLength(useOptionalInts) {
        let size = 12;
        for (let modification of this.modifications) {
            size += modification.getByteLength(useOptionalInts);
        }
        return size;
    }
}

/**
 * A modification table.
 */
class ModificationTable {
    constructor() {
        this.objects = [];
    }
    load(stream, useOptionalInts) {
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let object = new ModifiedObject();
            object.load(stream, useOptionalInts);
            this.objects[i] = object;
        }
    }
    save(stream, useOptionalInts) {
        stream.writeUint32(this.objects.length);
        for (let object of this.objects) {
            object.save(stream, useOptionalInts);
        }
    }
    getByteLength(useOptionalInts) {
        let size = 4;
        for (let object of this.objects) {
            size += object.getByteLength(useOptionalInts);
        }
        return size;
    }
}

/**
 * war3map.w3d - the doodad modification file.
 *
 * Also used for war3map.w3a (abilities), and war3map.w3q (upgrades).
 */
class War3MapW3d {
    constructor() {
        this.version = 0;
        this.originalTable = new ModificationTable();
        this.customTable = new ModificationTable();
    }
    load(bufferOrStream) {
        let stream;
        if (bufferOrStream instanceof BinaryStream) {
            stream = bufferOrStream;
        }
        else {
            stream = new BinaryStream(bufferOrStream);
        }
        this.version = stream.readInt32();
        this.originalTable.load(stream, true);
        this.customTable.load(stream, true);
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        this.originalTable.save(stream, true);
        this.customTable.save(stream, true);
        return stream.uint8array;
    }
    getByteLength() {
        return 4 + this.originalTable.getByteLength(true) + this.customTable.getByteLength(true);
    }
}

/**
 * war3map.w3u - the unit modification file.
 *
 * Also used for war3map.w3t (items), war3map.w3b (destructibles), and war3map.w3h (buffs).
 */
class War3MapW3u {
    constructor() {
        this.version = 0;
        this.originalTable = new ModificationTable();
        this.customTable = new ModificationTable();
    }
    load(bufferOrStream) {
        let stream;
        if (bufferOrStream instanceof BinaryStream) {
            stream = bufferOrStream;
        }
        else {
            stream = new BinaryStream(bufferOrStream);
        }
        this.version = stream.readInt32();
        this.originalTable.load(stream, false);
        this.customTable.load(stream, false);
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        this.originalTable.save(stream, false);
        this.customTable.save(stream, false);
        return stream.uint8array;
    }
    getByteLength() {
        return 4 + this.originalTable.getByteLength(false) + this.customTable.getByteLength(false);
    }
}

/**
 * A custom text trigger.
 */
class CustomTextTrigger {
    constructor() {
        this.text = '';
    }
    load(stream) {
        let textLength = stream.readInt32();
        if (textLength) {
            this.text = stream.read(textLength - 1);
            stream.skip(1);
        }
    }
    save(stream) {
        if (this.text.length) {
            stream.writeInt32(byteLengthUtf8(this.text) + 1);
            stream.write(this.text);
            stream.skip(1);
        }
        else {
            stream.writeInt32(0);
        }
    }
    getByteLength() {
        let size = 4;
        if (this.text.length) {
            size += byteLengthUtf8(this.text) + 1;
        }
        return size;
    }
}

/**
 * war3map.wct - the custom text (jass) trigger file.
 */
class War3MapWct {
    constructor() {
        this.version = 0;
        this.comment = '';
        this.trigger = new CustomTextTrigger();
        this.triggers = [];
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readInt32();
        if (this.version === 1) {
            this.comment = stream.readNull();
            this.trigger.load(stream);
        }
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let trigger = new CustomTextTrigger();
            trigger.load(stream);
            this.triggers[i] = trigger;
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        if (this.version === 1) {
            stream.writeNull(this.comment);
            this.trigger.save(stream);
        }
        stream.writeUint32(this.triggers.length);
        for (let trigger of this.triggers) {
            trigger.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 8;
        if (this.version === 1) {
            size += byteLengthUtf8(this.comment) + 1 + this.trigger.getByteLength();
        }
        for (let trigger of this.triggers) {
            size += trigger.getByteLength();
        }
        return size;
    }
}

/**
 * A Trigger category.
 *
 * Used to scope triggers together in a Folder-like hierarchy.
 */
class TriggerCategory {
    constructor() {
        this.id = 0;
        this.name = '';
        this.isComment = 0;
    }
    load(stream, version) {
        this.id = stream.readInt32();
        this.name = stream.readNull();
        if (version === 7) {
            this.isComment = stream.readInt32();
        }
    }
    save(stream, version) {
        stream.writeInt32(this.id);
        stream.writeNull(this.name);
        if (version === 7) {
            stream.writeInt32(this.isComment);
        }
    }
    getByteLength(version) {
        let size = 5 + byteLengthUtf8(this.name);
        if (version === 7) {
            size += 4;
        }
        return size;
    }
}

/**
 * A global variable.
 */
class Variable {
    constructor() {
        this.name = '';
        this.type = '';
        this.u1 = 0;
        this.isArray = 0;
        this.arraySize = 0;
        this.isInitialized = 0;
        this.initialValue = '';
    }
    load(stream, version) {
        this.name = stream.readNull();
        this.type = stream.readNull();
        this.u1 = stream.readInt32();
        this.isArray = stream.readInt32();
        if (version === 7) {
            this.arraySize = stream.readInt32();
        }
        this.isInitialized = stream.readInt32();
        this.initialValue = stream.readNull();
    }
    save(stream, version) {
        stream.writeNull(this.name);
        stream.writeNull(this.type);
        stream.writeInt32(this.u1);
        stream.writeInt32(this.isArray);
        if (version === 7) {
            stream.writeInt32(this.arraySize);
        }
        stream.writeInt32(this.isInitialized);
        stream.writeNull(this.initialValue);
    }
    getByteLength(version) {
        let size = 15 + byteLengthUtf8(this.name) + byteLengthUtf8(this.type) + byteLengthUtf8(this.initialValue);
        if (version === 7) {
            size += 4;
        }
        return size;
    }
}

/**
 * A function call in an expression.
 */
class SubParameters {
    constructor() {
        this.type = 0;
        this.name = '';
        this.beginParameters = 0;
        this.parameters = [];
    }
    load(stream, version, triggerData) {
        this.type = stream.readInt32();
        this.name = stream.readNull();
        this.beginParameters = stream.readInt32();
        if (this.beginParameters) {
            let signature = triggerData.getFunction(this.type, this.name);
            if (!signature) {
                throw new Error(`SubParameters ${this.name}'s signature is unknown`);
            }
            let args = signature.args;
            for (let i = 0, l = args.length; i < l; i++) {
                let parameter = new Parameter();
                try {
                    parameter.load(stream, version, triggerData);
                }
                catch (e) {
                    throw new Error(`SubParameters "${this.name}": Parameter ${i}: ${e}`);
                }
                this.parameters[i] = parameter;
            }
        }
    }
    save(stream, version) {
        stream.writeInt32(this.type);
        stream.writeNull(this.name);
        stream.writeInt32(this.beginParameters);
        for (let parameter of this.parameters) {
            parameter.save(stream, version);
        }
    }
    getByteLength(version) {
        let size = 9 + byteLengthUtf8(this.name);
        if (this.parameters.length) {
            for (let parameter of this.parameters) {
                size += parameter.getByteLength(version);
            }
        }
        return size;
    }
}

/**
 * A function parameter. Can be a function itself, in which case it will have a SubParameters structure.
 */
class Parameter {
    constructor() {
        this.type = 0;
        this.value = '';
        this.subParameters = null;
        this.u1 = 0;
        this.isArray = 0;
        this.arrayIndex = null;
    }
    load(stream, version, triggerData) {
        this.type = stream.readInt32();
        this.value = stream.readNull();
        if (stream.readInt32()) {
            let subParameters = new SubParameters();
            try {
                subParameters.load(stream, version, triggerData);
            }
            catch (e) {
                throw new Error(`Parameter "${this.value}": SubParameters ${e}`);
            }
            this.subParameters = subParameters;
        }
        if ((version === 4 && this.type === 2) || (version === 7 && this.subParameters)) {
            this.u1 = stream.readInt32();
        }
        if ((version === 4 && this.type !== 2) || version === 7) {
            this.isArray = stream.readInt32();
        }
        if (this.isArray) {
            let arrayIndex = new Parameter();
            try {
                arrayIndex.load(stream, version, triggerData);
            }
            catch (e) {
                throw new Error(`Parameter "${this.value}": ArrayIndex: ${e}`);
            }
            this.arrayIndex = arrayIndex;
        }
    }
    save(stream, version) {
        stream.writeInt32(this.type);
        stream.writeNull(this.value);
        if (this.subParameters) {
            stream.writeInt32(1);
            this.subParameters.save(stream, version);
        }
        else {
            stream.writeInt32(0);
        }
        if ((version === 4 && this.type === 2) || (version === 7 && this.subParameters)) {
            stream.writeInt32(this.u1);
        }
        if ((version === 4 && this.type !== 2) || version === 7) {
            stream.writeInt32(this.isArray);
        }
        if (this.isArray && this.arrayIndex) {
            this.arrayIndex.save(stream, version);
        }
    }
    getByteLength(version) {
        let size = 9 + byteLengthUtf8(this.value);
        if (this.subParameters) {
            size += this.subParameters.getByteLength(version);
        }
        if ((version === 4 && this.type === 2) || (version === 7 && this.subParameters)) {
            size += 4;
        }
        if ((version === 4 && this.type !== 2) || version === 7) {
            size += 4;
        }
        if (this.isArray && this.arrayIndex) {
            size += this.arrayIndex.getByteLength(version);
        }
        return size;
    }
}

/**
 * An Event/Condition/Action.
 */
class ECA {
    constructor() {
        this.type = -1;
        this.group = -1;
        this.name = '';
        this.isEnabled = 0;
        this.parameters = [];
        this.ecas = [];
    }
    load(stream, version, isChildECA, triggerData) {
        this.type = stream.readInt32();
        if (isChildECA) {
            this.group = stream.readUint32();
        }
        this.name = stream.readNull();
        this.isEnabled = stream.readInt32();
        let signature = triggerData.getFunction(this.type, this.name);
        if (!signature) {
            throw new Error(`ECA ${this.name}'s signature is unknown`);
        }
        let args = signature.args;
        for (let i = 0, l = args.length; i < l; i++) {
            let parameter = new Parameter();
            try {
                parameter.load(stream, version, triggerData);
            }
            catch (e) {
                throw new Error(`ECA "${this.name}": Parameter ${i}: ${e}`);
            }
            this.parameters[i] = parameter;
        }
        if (version === 7) {
            for (let i = 0, l = stream.readUint32(); i < l; i++) {
                let eca = new ECA();
                try {
                    eca.load(stream, version, true, triggerData);
                }
                catch (e) {
                    throw new Error(`ECA "${this.name}": Child ECA ${i} ${e}`);
                }
                this.ecas[i] = eca;
            }
        }
    }
    save(stream, version) {
        stream.writeInt32(this.type);
        if (this.group !== -1) {
            stream.writeInt32(this.group);
        }
        stream.writeNull(this.name);
        stream.writeInt32(this.isEnabled);
        for (let parameter of this.parameters) {
            parameter.save(stream, version);
        }
        if (version === 7) {
            stream.writeUint32(this.ecas.length);
            for (let eca of this.ecas) {
                eca.save(stream, version);
            }
        }
    }
    getByteLength(version) {
        let size = 9 + byteLengthUtf8(this.name);
        if (this.group !== -1) {
            size += 4;
        }
        for (let parameter of this.parameters) {
            size += parameter.getByteLength(version);
        }
        if (version === 7) {
            size += 4;
            for (let eca of this.ecas) {
                size += eca.getByteLength(version);
            }
        }
        return size;
    }
}

/**
 * A GUI Trigger.
 */
class Trigger {
    constructor() {
        this.name = '';
        this.description = '';
        this.isComment = 0;
        this.isEnabled = 0;
        this.isCustom = 0;
        this.isInitiallyOff = 0;
        this.runOnInitialization = 0;
        this.category = 0;
        this.ecas = [];
    }
    load(stream, version, triggerData) {
        this.name = stream.readNull();
        this.description = stream.readNull();
        if (version === 7) {
            this.isComment = stream.readInt32();
        }
        this.isEnabled = stream.readInt32();
        this.isCustom = stream.readInt32();
        this.isInitiallyOff = stream.readInt32();
        this.runOnInitialization = stream.readInt32();
        this.category = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let eca = new ECA();
            try {
                eca.load(stream, version, false, triggerData);
            }
            catch (e) {
                throw new Error(`Trigger "${this.name}": ECA ${i}: ${e}`);
            }
            this.ecas[i] = eca;
        }
    }
    save(stream, version) {
        stream.writeNull(this.name);
        stream.writeNull(this.description);
        if (version === 7) {
            stream.writeInt32(this.isComment);
        }
        stream.writeInt32(this.isEnabled);
        stream.writeInt32(this.isCustom);
        stream.writeInt32(this.isInitiallyOff);
        stream.writeInt32(this.runOnInitialization);
        stream.writeInt32(this.category);
        stream.writeUint32(this.ecas.length);
        for (let eca of this.ecas) {
            eca.save(stream, version);
        }
    }
    getByteLength(version) {
        let size = 26 + byteLengthUtf8(this.name) + byteLengthUtf8(this.description);
        if (version === 7) {
            size += 4;
        }
        for (let eca of this.ecas) {
            size += eca.getByteLength(version);
        }
        return size;
    }
}

/**
 * war3map.wtg - the trigger file.
 */
class War3MapWtg {
    constructor() {
        this.version = 0;
        this.categories = [];
        this.u1 = 0;
        this.variables = [];
        this.triggers = [];
    }
    load(buffer, triggerData) {
        let stream = new BinaryStream(buffer);
        if (stream.readBinary(4) !== 'WTG!') {
            throw new Error('Not a WTG file');
        }
        this.version = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let category = new TriggerCategory();
            category.load(stream, this.version);
            this.categories[i] = category;
        }
        this.u1 = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let variable = new Variable();
            variable.load(stream, this.version);
            this.variables[i] = variable;
        }
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let trigger = new Trigger();
            try {
                trigger.load(stream, this.version, triggerData);
            }
            catch (e) {
                throw new Error(`Trigger ${i}: ${e}`);
            }
            this.triggers[i] = trigger;
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeBinary('WTG!');
        stream.writeInt32(this.version);
        stream.writeUint32(this.categories.length);
        for (let category of this.categories) {
            category.save(stream, this.version);
        }
        stream.writeInt32(this.u1);
        stream.writeUint32(this.variables.length);
        for (let variable of this.variables) {
            variable.save(stream, this.version);
        }
        stream.writeUint32(this.triggers.length);
        for (let trigger of this.triggers) {
            trigger.save(stream, this.version);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 24;
        let version = this.version;
        for (let category of this.categories) {
            size += category.getByteLength(version);
        }
        for (let variable of this.variables) {
            size += variable.getByteLength(version);
        }
        for (let trigger of this.triggers) {
            size += trigger.getByteLength(version);
        }
        return size;
    }
}

/**
 * Used to read and write MDL tokens.
 */
class TokenStream {
    constructor(buffer) {
        this.index = 0;
        this.ident = 0;
        this.indentSpaces = 4;
        this.precision = 1000000; // 6 digits after the decimal point.
        this.buffer = buffer || '';
    }
    /**
     * Clear the stream from whatever buffer it had.
     */
    clear() {
        this.buffer = '';
        this.index = 0;
        this.ident = 0;
    }
    /**
     * Reads the next token in the stream.
     * Whitespaces are ignored outside of strings in the form of "".
     * Comments in the form of // are ignored.
     * Commas and colons are ignored as well.
     * Curly braces are used as separators, generally to denote text blocks.
     *
     * For example, given the following string:
     *
     *     Header "A String" {
     *         Name Value, // A Comment
     *     }
     *
     * Read will return the values in order:
     *
     *     Header
     *     "A String"
     *     {
     *     Name
     *     Value
     *     }
     *
     * There are wrappers around read, below, that help to read structured code, check them out!
     */
    readToken() {
        let buffer = this.buffer;
        let length = buffer.length;
        let inComment = false;
        let inString = false;
        let token = '';
        while (this.index < length) {
            let c = buffer[this.index++];
            if (inComment) {
                if (c === '\n') {
                    inComment = false;
                }
            }
            else if (inString) {
                if (c === '\\') {
                    token += c + buffer[this.index++];
                }
                else if (c === '\n') {
                    token += '\\n';
                }
                else if (c === '\r') {
                    token += '\\r';
                }
                else if (c === '"') {
                    return token;
                }
                else {
                    token += c;
                }
            }
            else if (c === ' ' || c === ',' || c === '\t' || c === '\n' || c === ':' || c === '\r') {
                if (token.length) {
                    return token;
                }
            }
            else if (c === '{' || c === '}') {
                if (token.length) {
                    this.index--;
                    return token;
                }
                else {
                    return c;
                }
            }
            else if (c === '/' && buffer[this.index] === '/') {
                if (token.length) {
                    this.index--;
                    return token;
                }
                else {
                    inComment = true;
                }
            }
            else if (c === '"') {
                if (token.length) {
                    this.index--;
                    return token;
                }
                else {
                    inString = true;
                }
            }
            else {
                token += c;
            }
        }
    }
    /**
     * Same as readToken, but if the end of the stream was encountered, an exception will be thrown.
     */
    read() {
        let value = this.readToken();
        if (value === undefined) {
            throw new Error('End of stream reached prematurely');
        }
        return value;
    }
    /**
     * Reads the next token without advancing the stream.
     */
    peek() {
        let index = this.index;
        let value = this.read();
        this.index = index;
        return value;
    }
    /**
     * Reads the next token, and parses it as an integer.
     */
    readInt() {
        return parseInt(this.read());
    }
    /**
     * Reads the next token, and parses it as a float.
     */
    readFloat() {
        return parseFloat(this.read());
    }
    /**
     * { Number0, Number1, ..., NumberN }
     */
    readVector(view) {
        this.read(); // {
        for (let i = 0, l = view.length; i < l; i++) {
            view[i] = this.readFloat();
        }
        this.read(); // }
        return view;
    }
    /**
     * {
     *     { Value1, Value2, ..., ValueSize },
     *     { Value1, Value2, ..., ValueSize },
     *     ...
     * }
     */
    readVectorsBlock(view, size) {
        this.read(); // {
        for (let i = 0, l = view.length; i < l; i += size) {
            this.readVector(view.subarray(i, i + size));
        }
        this.read(); // }
        return view;
    }
    /**
     * Reads a color in the form:
     *
     *      { R, G, B }
     *
     * The color is sizzled to BGR.
     */
    readColor(view) {
        this.read(); // {
        view[2] = this.readFloat();
        view[1] = this.readFloat();
        view[0] = this.readFloat();
        this.read(); // }
        return view;
    }
    /**
     * Helper generator for block reading.
     * Let's say we have a block like so:
     *
     *     {
     *         Key1 Value1
     *         Key2 Value2
     *         ...
     *         KeyN ValueN
     *     }
     *
     * The generator yields the keys one by one, and the caller needs to read the values based on the keys.
     * It is used for most MDL blocks.
     */
    *readBlock() {
        this.read(); // {
        let token = this.read();
        while (token !== '}') {
            yield token;
            token = this.read();
        }
    }
    /**
     * Adds the given string to the buffer.
     * The current indentation level is prepended, and the stream goes to the next line after the write.
     */
    writeLine(line) {
        this.buffer += `${' '.repeat(this.ident * this.indentSpaces)}${line}\n`;
    }
    /**
     * Flag,
     */
    writeFlag(flag) {
        this.writeLine(`${flag},`);
    }
    /**
     * Name Flag,
     */
    writeFlagAttrib(name, flag) {
        this.writeLine(`${name} ${flag},`);
    }
    /**
     * Name Value,
     */
    writeNumberAttrib(name, value) {
        this.writeLine(`${name} ${floatDecimals(value, this.precision)},`);
    }
    /**
     * Name "Value",
     */
    writeStringAttrib(name, value) {
        this.writeLine(`${name} "${value}",`);
    }
    /**
     * Name { Value0, Value1, ..., ValueN }
     */
    writeVectorAttrib(name, value) {
        this.writeLine(`${name} { ${floatArrayDecimals(value, this.precision)} },`);
    }
    /**
     * Writes a color in the form:
     *
     *      { B, G, R }
     *
     * The color is sizzled to RGB.
     * The name can be either "Color" or "static Color", depending on the context.
     */
    writeColor(name, value) {
        let b = floatDecimals(value[0], this.precision);
        let g = floatDecimals(value[1], this.precision);
        let r = floatDecimals(value[2], this.precision);
        this.writeLine(`${name} { ${r}, ${g}, ${b} },`);
    }
    /**
     * { Value0, Value1, ..., ValueN },
     */
    writeVector(value) {
        this.writeLine(`{ ${floatArrayDecimals(value, this.precision)} },`);
    }
    /**
     * Name Vectors {
     *     { Value1, Value2, ..., ValueSize },
     *     { Value1, Value2, ..., ValueSize },
     *     ...
     * }
     */
    writeVectorArrayBlock(name, view, size) {
        this.startBlock(name, view.length / size);
        for (let i = 0, l = view.length; i < l; i += size) {
            this.writeVector(view.subarray(i, i + size));
        }
        this.endBlock();
    }
    /**
     * Starts a new block in the form:
     *
     *      Header1 Header2 ... HeaderN {
     *          ...
     *      }
     */
    startBlock(name, ...headers) {
        if (headers.length) {
            name = `${name} ${headers.join(' ')}`;
        }
        this.writeLine(`${name} {`);
        this.ident += 1;
    }
    /**
     * Starts a new block in the form:
     *
     *      Header "Name" {
     *          ...
     *      }
     */
    startObjectBlock(header, name) {
        // Turns out you can have quotation marks in object names.
        this.writeLine(`${header} "${name.replace(/"/g, '\\"')}" {`);
        this.ident += 1;
    }
    /**
     * Ends a previously started block, and handles the indentation.
     */
    endBlock() {
        this.ident -= 1;
        this.writeLine('}');
    }
    /**
     * Ends a previously started block, and handles the indentation.
     * Adds a comma after the block end.
     */
    endBlockComma() {
        this.ident -= 1;
        this.writeLine('},');
    }
    /**
     * Increases the indentation level for following line writes.
     */
    indent() {
        this.ident += 1;
    }
    /**
     * Decreases the indentation level for following line writes.
     */
    unindent() {
        this.ident -= 1;
    }
}

/**
 * war3map.wts - the string table file.
 *
 * Contains a map of number->string.
 * When other map data like triggers use the string TRIGSTR_XXX, where XXX is a number, the value will be fetched from the table.
 */
class War3MapWts {
    constructor() {
        this.stringMap = new Map();
    }
    load(buffer) {
        let stream = new TokenStream(buffer);
        let token;
        // Find the first instance of "STRING".
        // There are some weird war3map.wts files that begin with the bytes "ï»¿", and this causes the tokenizer to see the first token as "ï»¿STRING".
        // Going to the first "STRING" means we can ignore any weird bytes that happened to be before.
        let start = buffer.indexOf('STRING');
        // Can war3map.wts have no entries? I don't know, might as well add a condition.
        if (start === -1) {
            return;
        }
        stream.index = start;
        while ((token = stream.readToken())) {
            if (token === 'STRING') {
                let index = stream.readInt();
                stream.read(); // {
                let end = buffer.indexOf('}', stream.index);
                // For broken files, keep whatever data can be kept, and throw an exception.
                if (end === -1) {
                    this.stringMap.set(index, buffer.slice(stream.index, buffer.length).trim());
                    throw new Error(`WTS: missing data in string ${this.stringMap.size} (and maybe more)`);
                }
                this.stringMap.set(index, buffer.slice(stream.index, end).trim());
                stream.index = end;
            }
        }
    }
    save() {
        let buffer = '';
        for (let [key, value] of this.stringMap) {
            buffer += `STRING ${key}\n{\n${value}\n}\n`;
        }
        return buffer;
    }
}

/**
 * Warcraft 3 map (W3X and W3M).
 */
class War3Map {
    constructor() {
        this.unknown = 0;
        this.name = '';
        this.flags = 0;
        this.maxPlayers = 0;
        this.archive = new MpqArchive();
        this.imports = new War3MapImp();
        this.readonly = false;
        this.u1 = 0;
    }
    /**
     * Load an existing map.
     *
     * Note that this clears the map from whatever it had in it before.
     */
    load(buffer, readonly = false) {
        let stream = new BinaryStream(buffer);
        // The header no longer exists since some 1.3X.X patch?
        if (stream.readBinary(4) === 'HM3W') {
            this.u1 = stream.readUint32();
            this.name = stream.readNull();
            this.flags = stream.readUint32();
            this.maxPlayers = stream.readUint32();
        }
        this.readonly = readonly;
        // Read the archive.
        this.archive.load(buffer, readonly);
        // Read in the imports file if there is one.
        this.readImports();
    }
    /**
     * Save this map.
     * If the archive is in readonly mode, returns null.
     */
    save() {
        if (this.readonly) {
            return null;
        }
        // Update the imports if needed.
        this.setImportsFile();
        let headerSize = 512;
        let archiveBuffer = this.archive.save();
        if (!archiveBuffer) {
            return null;
        }
        let bytes = new Uint8Array(headerSize + archiveBuffer.byteLength);
        let stream = new BinaryStream(bytes);
        // Write the header.
        stream.writeBinary('HM3W');
        stream.writeUint32(this.u1);
        stream.writeNull(this.name);
        stream.writeUint32(this.flags);
        stream.writeUint32(this.maxPlayers);
        // Write the archive.
        bytes.set(archiveBuffer, headerSize);
        return bytes;
    }
    /**
     * A shortcut to the internal archive function.
     */
    getFileNames() {
        return this.archive.getFileNames();
    }
    /**
     * Gets a list of the file names imported in this map.
     */
    getImportNames() {
        let names = [];
        for (let entry of this.imports.entries.values()) {
            let isCustom = entry.isCustom;
            if (isCustom === 10 || isCustom === 13) {
                names.push(entry.path);
            }
            else {
                names.push(`war3mapImported\\${entry.path}`);
            }
        }
        return names;
    }
    /**
     * Sets the imports file with all of the imports.
     *
     * Does nothing if the archive is in readonly mode.
     */
    setImportsFile() {
        if (this.readonly) {
            return false;
        }
        if (this.imports.entries.size > 0) {
            return this.set('war3map.imp', this.imports.save());
        }
        return false;
    }
    /**
     * Imports a file to this archive.
     *
     * If the file already exists, its buffer will be set.
     *
     * Files added to the archive but not to the imports list will be deleted by the World Editor automatically.
     * This of course doesn't apply to internal map files.
     *
     * Does nothing if the archive is in readonly mode.
     */
    import(name, buffer) {
        if (this.readonly) {
            return false;
        }
        if (this.archive.set(name, buffer)) {
            this.imports.set(name);
            return true;
        }
        return false;
    }
    /**
     * A shortcut to the internal archive function.
     */
    set(name, buffer) {
        if (this.readonly) {
            return false;
        }
        return this.archive.set(name, buffer);
    }
    /**
     * A shortcut to the internal archive function.
     */
    get(name) {
        return this.archive.get(name);
    }
    /**
     * Get the map's script.
     */
    getScriptFile() {
        return this.get('war3map.j') || this.get('scripts\\war3map.j') || this.get('war3map.lua') || this.get('scripts\\war3map.lua');
    }
    /**
     * A shortcut to the internal archive function.
     */
    has(name) {
        return this.archive.has(name);
    }
    /**
     * Deletes a file from the internal archive.
     *
     * Note that if the file is in the imports list, it will be removed from it too.
     *
     * Use this rather than the internal archive's delete.
     */
    delete(name) {
        if (this.readonly) {
            return false;
        }
        // If this file is in the import list, remove it.
        this.imports.delete(name);
        return this.archive.delete(name);
    }
    /**
     * A shortcut to the internal archive function.
     */
    rename(name, newName) {
        if (this.readonly) {
            return false;
        }
        if (this.archive.rename(name, newName)) {
            // If the file was actually renamed, and it is an import, rename also the import entry.
            this.imports.rename(name, newName);
            return true;
        }
        return false;
    }
    /**
     * Read the imports file.
     */
    readImports() {
        let file = this.archive.get('war3map.imp');
        if (file) {
            let buffer = file.arrayBuffer();
            if (buffer) {
                this.imports.load(buffer);
            }
        }
    }
    /**
     * Read and parse the trigger file.
     */
    readTriggers(triggerData) {
        let file = this.archive.get('war3map.wtg');
        if (file) {
            let buffer = file.arrayBuffer();
            if (buffer) {
                let object = new War3MapWtg();
                object.load(buffer, triggerData);
                return object;
            }
        }
    }
    /**
     * Read and parse the custom text trigger file.
     */
    readCustomTextTriggers() {
        let file = this.archive.get('war3map.wct');
        if (file) {
            let buffer = file.arrayBuffer();
            if (buffer) {
                let object = new War3MapWct();
                object.load(buffer);
                return object;
            }
        }
    }
    /**
     * Read and parse the string table file.
     */
    readStringTable() {
        let file = this.archive.get('war3map.wts');
        if (file) {
            let buffer = file.text();
            if (buffer) {
                let object = new War3MapWts();
                object.load(buffer);
                return object;
            }
        }
    }
    /**
     * Read and parse all of the modification tables.
     */
    readModifications() {
        let modifications = {};
        // useOptionalInts:
        //      w3u: no (units)
        //      w3t: no (items)
        //      w3b: no (destructables)
        //      w3d: yes (doodads)
        //      w3a: yes (abilities)
        //      w3h: no (buffs)
        //      w3q: yes (upgrades)
        let fileNames = ['w3u', 'w3t', 'w3b', 'w3d', 'w3a', 'w3h', 'w3q'];
        let useOptionalInts = [false, false, false, true, true, false, true];
        for (let i = 0, l = fileNames.length; i < l; i++) {
            let file = this.archive.get(`war3map.${fileNames[i]}`);
            if (file) {
                let buffer = file.arrayBuffer();
                if (buffer) {
                    let modification;
                    if (useOptionalInts[i]) {
                        modification = new War3MapW3d();
                    }
                    else {
                        modification = new War3MapW3u();
                    }
                    modification.load(buffer);
                    modifications[fileNames[i]] = modification;
                }
            }
        }
        return modifications;
    }
}

/**
 * A random item.
 */
class RandomItem {
    constructor() {
        this.id = '\0\0\0\0';
        this.chance = 0;
    }
    load(stream) {
        this.id = stream.readBinary(4);
        this.chance = stream.readInt32();
    }
    save(stream) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.chance);
    }
}

/**
 * A random item set.
 */
class RandomItemSet {
    constructor() {
        this.items = [];
    }
    load(stream) {
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let item = new RandomItem();
            item.load(stream);
            this.items.push(item);
        }
    }
    save(stream) {
        stream.writeUint32(this.items.length);
        for (let item of this.items) {
            item.save(stream);
        }
    }
    getByteLength() {
        return 4 + this.items.length * 8;
    }
}

/**
 * A doodad.
 */
class Doodad {
    constructor() {
        this.id = '\0\0\0\0';
        this.variation = 0;
        this.location = new Float32Array(3);
        this.angle = 0;
        this.scale = new Float32Array([1, 1, 1]);
        /**
         * @since Game version 1.32
         */
        this.skin = '\0\0\0\0';
        this.flags = 0;
        this.life = 0;
        this.itemTable = -1;
        this.itemSets = [];
        this.editorId = 0;
        this.u1 = new Uint8Array(8);
    }
    load(stream, version, isReforged) {
        this.id = stream.readBinary(4);
        this.variation = stream.readInt32();
        stream.readFloat32Array(this.location);
        this.angle = stream.readFloat32();
        stream.readFloat32Array(this.scale);
        if (isReforged) {
            this.skin = stream.readBinary(4);
        }
        this.flags = stream.readUint8();
        this.life = stream.readUint8();
        if (version > 7) {
            this.itemTable = stream.readUint32();
            for (let i = 0, l = stream.readUint32(); i < l; i++) {
                let itemSet = new RandomItemSet();
                itemSet.load(stream);
                this.itemSets.push(itemSet);
            }
        }
        this.editorId = stream.readInt32();
    }
    save(stream, version, isReforged) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.variation);
        stream.writeFloat32Array(this.location);
        stream.writeFloat32(this.angle);
        stream.writeFloat32Array(this.scale);
        if (isReforged) {
            stream.writeBinary(this.skin);
        }
        stream.writeUint8(this.flags);
        stream.writeUint8(this.life);
        if (version > 7) {
            stream.writeUint32(this.itemTable);
            stream.writeUint32(this.itemSets.length);
            for (let itemSet of this.itemSets) {
                itemSet.save(stream);
            }
        }
        stream.writeInt32(this.editorId);
    }
    getByteLength(version, isReforged) {
        let size = 42;
        if (isReforged) {
            size += 4;
        }
        if (version > 7) {
            size += 8;
            for (let itemSet of this.itemSets) {
                size += itemSet.getByteLength();
            }
        }
        return size;
    }
}

/**
 * A terrain doodad.
 *
 * This type of doodad works much like cliffs.
 * It uses the height of the terrain, and gets affected by the ground heightmap.
 * It cannot be manipulated in any way in the World Editor once placed.
 * Indeed, the only way to change it is to remove it by changing cliffs around it.
 */
class TerrainDoodad {
    constructor() {
        this.id = '\0\0\0\0';
        this.u1 = 0;
        this.location = new Uint32Array(2);
    }
    load(stream, version) {
        this.id = stream.readBinary(4);
        this.u1 = stream.readUint32();
        stream.readUint32Array(this.location);
    }
    save(stream, version) {
        stream.writeBinary(this.id);
        stream.writeUint32(this.u1);
        stream.writeUint32Array(this.location);
    }
}

/**
 * war3map.doo - the doodad and destructible file.
 */
class War3MapDoo {
    constructor() {
        this.version = 0;
        this.u1 = new Uint8Array(4);
        this.doodads = [];
        this.u2 = new Uint8Array(4);
        this.terrainDoodads = [];
    }
    load(buffer, isReforged) {
        let stream = new BinaryStream(buffer);
        if (stream.readBinary(4) !== 'W3do') {
            return false;
        }
        this.version = stream.readInt32();
        stream.readUint8Array(this.u1);
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let doodad = new Doodad();
            doodad.load(stream, this.version, isReforged);
            this.doodads.push(doodad);
        }
        stream.readUint8Array(this.u2);
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let terrainDoodad = new TerrainDoodad();
            terrainDoodad.load(stream, this.version);
            this.terrainDoodads.push(terrainDoodad);
        }
    }
    save(isReforged) {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength(isReforged)));
        stream.writeBinary('W3do');
        stream.writeInt32(this.version);
        stream.writeUint8Array(this.u1);
        stream.writeUint32(this.doodads.length);
        for (let doodad of this.doodads) {
            doodad.save(stream, this.version, isReforged);
        }
        stream.writeUint8Array(this.u2);
        stream.writeUint32(this.terrainDoodads.length);
        for (let terrainDoodad of this.terrainDoodads) {
            terrainDoodad.save(stream, this.version);
        }
        return stream.uint8array;
    }
    getByteLength(isReforged) {
        let size = 24 + this.terrainDoodads.length * 16;
        for (let doodad of this.doodads) {
            size += doodad.getByteLength(this.version, isReforged);
        }
        return size;
    }
}

var doo = {
    File: War3MapDoo,
    Doodad,
    RandomItemSet,
    RandomItem,
    TerrainDoodad,
};

var imp = {
    File: War3MapImp,
    Import,
};

/**
 * A minimap icon.
 */
class MinimapIcon {
    constructor() {
        this.type = 0;
        this.location = new Int32Array(2);
        /**
         * Stored as BGRA.
         */
        this.color = new Uint8Array(4);
    }
    load(stream) {
        this.type = stream.readInt32();
        stream.readInt32Array(this.location);
        stream.readUint8Array(this.color);
    }
    save(stream) {
        stream.writeInt32(this.type);
        stream.writeInt32Array(this.location);
        stream.writeUint8Array(this.color);
    }
}

/**
 * war3map.mmp - the minimap icon file.
 */
class War3MapMmp {
    constructor() {
        this.u1 = 0;
        this.icons = [];
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.u1 = stream.readInt32();
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let icon = new MinimapIcon();
            icon.load(stream);
            this.icons[i] = icon;
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.u1);
        stream.writeUint32(this.icons.length);
        for (let icon of this.icons) {
            icon.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        return 8 + this.icons.length * 16;
    }
}

var mmp = {
    File: War3MapMmp,
    MinimapIcon,
};

/**
 * war3map.shd - the shadow file.
 */
class War3MapShd {
    constructor() {
        this.shadows = new Uint8Array(0);
    }
    load(buffer, width, height) {
        this.shadows = new Uint8Array(buffer.slice(0, width * height * 16));
    }
    save() {
        return this.shadows.slice();
    }
    getByteLength() {
        return this.shadows.length;
    }
}

var shd = {
    File: War3MapShd,
};

/**
 * A camera.
 */
class Camera {
    constructor() {
        this.targetLocation = new Float32Array(3);
        this.rotation = 0;
        this.angleOfAttack = 0;
        this.distance = 0;
        this.roll = 0;
        this.fieldOfView = 0;
        this.farClippingPlane = 0;
        this.nearClippingPlane = 0;
        this.cinematicName = '';
    }
    load(stream) {
        stream.readFloat32Array(this.targetLocation);
        this.rotation = stream.readFloat32(); // in degrees
        this.angleOfAttack = stream.readFloat32(); // in degrees
        this.distance = stream.readFloat32();
        this.roll = stream.readFloat32();
        this.fieldOfView = stream.readFloat32(); // in degrees
        this.farClippingPlane = stream.readFloat32();
        this.nearClippingPlane = stream.readFloat32(); // probably near clipping plane
        this.cinematicName = stream.readNull();
    }
    save(stream) {
        stream.writeFloat32Array(this.targetLocation);
        stream.writeFloat32(this.rotation);
        stream.writeFloat32(this.angleOfAttack);
        stream.writeFloat32(this.distance);
        stream.writeFloat32(this.roll);
        stream.writeFloat32(this.fieldOfView);
        stream.writeFloat32(this.farClippingPlane);
        stream.writeFloat32(this.nearClippingPlane);
        stream.writeNull(this.cinematicName);
    }
    getByteLength() {
        return 41 + byteLengthUtf8(this.cinematicName);
    }
}

/**
 * war3map.w3c - the camera file.
 */
class War3MapW3c {
    constructor() {
        this.version = 0;
        this.cameras = [];
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let camera = new Camera();
            camera.load(stream);
            this.cameras[i] = camera;
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        stream.writeUint32(this.cameras.length);
        for (let camera of this.cameras) {
            camera.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 8;
        for (let camera of this.cameras) {
            size += camera.getByteLength();
        }
        return size;
    }
}

var w3c = {
    File: War3MapW3c,
    Camera,
};

var w3d = {
    File: War3MapW3d,
};

/**
 * A tile corner.
 */
class Corner {
    constructor() {
        this.groundHeight = 0;
        this.waterHeight = 0;
        this.mapEdge = 0;
        this.ramp = 0;
        this.blight = 0;
        this.water = 0;
        this.boundary = 0;
        this.groundTexture = 0;
        this.cliffVariation = 0;
        this.groundVariation = 0;
        this.cliffTexture = 0;
        this.layerHeight = 0;
    }
    load(stream) {
        this.groundHeight = (stream.readInt16() - 8192) / 512;
        let waterAndEdge = stream.readInt16();
        this.waterHeight = ((waterAndEdge & 0x3FFF) - 8192) / 512;
        this.mapEdge = waterAndEdge & 0x4000;
        let textureAndFlags = stream.readUint8();
        this.ramp = textureAndFlags & 0b00010000;
        this.blight = textureAndFlags & 0b00100000;
        this.water = textureAndFlags & 0b01000000;
        this.boundary = textureAndFlags & 0b10000000;
        this.groundTexture = textureAndFlags & 0b00001111;
        let variation = stream.readUint8();
        this.cliffVariation = (variation & 0b11100000) >>> 5;
        this.groundVariation = variation & 0b00011111;
        let cliffTextureAndLayer = stream.readUint8();
        this.cliffTexture = (cliffTextureAndLayer & 0b11110000) >>> 4;
        this.layerHeight = cliffTextureAndLayer & 0b00001111;
    }
    save(stream) {
        stream.writeInt16(this.groundHeight * 512 + 8192);
        stream.writeInt16(this.waterHeight * 512 + 8192 + this.mapEdge << 14);
        stream.writeUint8((this.ramp << 4) | (this.blight << 5) | (this.water << 6) | (this.boundary << 7) | this.groundTexture);
        stream.writeUint8((this.cliffVariation << 5) | this.groundVariation);
        stream.writeUint8((this.cliffTexture << 4) + this.layerHeight);
    }
}

/**
 * war3map.w3e - the environment file.
 */
class War3MapW3e {
    constructor() {
        this.version = 0;
        this.tileset = 'A';
        this.haveCustomTileset = 0;
        this.groundTilesets = [];
        this.cliffTilesets = [];
        this.mapSize = new Int32Array(2);
        this.centerOffset = new Float32Array(2);
        this.corners = [];
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        if (stream.readBinary(4) !== 'W3E!') {
            return;
        }
        this.version = stream.readInt32();
        this.tileset = stream.readBinary(1);
        this.haveCustomTileset = stream.readInt32();
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            this.groundTilesets[i] = stream.readBinary(4);
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            this.cliffTilesets[i] = stream.readBinary(4);
        }
        stream.readInt32Array(this.mapSize);
        stream.readFloat32Array(this.centerOffset);
        for (let row = 0, rows = this.mapSize[1]; row < rows; row++) {
            this.corners[row] = [];
            for (let column = 0, columns = this.mapSize[0]; column < columns; column++) {
                let corner = new Corner();
                corner.load(stream);
                this.corners[row][column] = corner;
            }
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeBinary('W3E!');
        stream.writeInt32(this.version);
        stream.writeBinary(this.tileset);
        stream.writeInt32(this.haveCustomTileset);
        stream.writeUint32(this.groundTilesets.length);
        for (let groundTileset of this.groundTilesets) {
            stream.writeBinary(groundTileset);
        }
        stream.writeUint32(this.cliffTilesets.length);
        for (let cliffTileset of this.cliffTilesets) {
            stream.writeBinary(cliffTileset);
        }
        stream.writeInt32Array(this.mapSize);
        stream.writeFloat32Array(this.centerOffset);
        for (let row of this.corners) {
            for (let corner of row) {
                corner.save(stream);
            }
        }
        return stream.uint8array;
    }
    getByteLength() {
        return 37 + (this.groundTilesets.length * 4) + (this.cliffTilesets.length * 4) + (this.mapSize[0] * this.mapSize[1] * 7);
    }
}

var w3e = {
    File: War3MapW3e,
    Corner,
};

/**
 * A force.
 */
class Force {
    constructor() {
        this.flags = 0;
        this.playerMasks = 0;
        this.name = '';
    }
    load(stream) {
        this.flags = stream.readUint32();
        this.playerMasks = stream.readUint32();
        this.name = stream.readNull();
    }
    save(stream) {
        stream.writeUint32(this.flags);
        stream.writeUint32(this.playerMasks);
        stream.writeNull(this.name);
    }
    getByteLength() {
        return 9 + byteLengthUtf8(this.name);
    }
}

/**
 * A player.
 */
class Player {
    constructor() {
        this.id = 0;
        this.type = 0;
        this.race = 0;
        this.isFixedStartPosition = 0;
        this.name = '';
        this.startLocation = new Float32Array(2);
        this.allyLowPriorities = 0;
        this.allyHighPriorities = 0;
        this.unknown1 = new Uint8Array(8);
    }
    load(stream, version) {
        this.id = stream.readInt32();
        this.type = stream.readInt32();
        this.race = stream.readInt32();
        this.isFixedStartPosition = stream.readInt32();
        this.name = stream.readNull();
        stream.readFloat32Array(this.startLocation);
        this.allyLowPriorities = stream.readUint32();
        this.allyHighPriorities = stream.readUint32();
        if (version > 30) {
            stream.readUint8Array(this.unknown1);
        }
    }
    save(stream, version) {
        stream.writeInt32(this.id);
        stream.writeInt32(this.type);
        stream.writeInt32(this.race);
        stream.writeInt32(this.isFixedStartPosition);
        stream.writeNull(this.name);
        stream.writeFloat32Array(this.startLocation);
        stream.writeUint32(this.allyLowPriorities);
        stream.writeUint32(this.allyHighPriorities);
        if (version > 30) {
            stream.writeUint8Array(this.unknown1);
        }
    }
    getByteLength(version) {
        return (version > 30 ? 41 : 33) + byteLengthUtf8(this.name);
    }
}

/**
 * A random item.
 */
class RandomItem$1 {
    constructor() {
        this.chance = 0;
        this.id = '\0\0\0\0';
    }
    load(stream) {
        this.chance = stream.readInt32();
        this.id = stream.readBinary(4);
    }
    save(stream) {
        stream.writeInt32(this.chance);
        stream.writeBinary(this.id);
    }
}

/**
 * A random item set.
 */
class RandomItemSet$1 {
    constructor() {
        this.items = [];
    }
    load(stream) {
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let item = new RandomItem$1();
            item.load(stream);
            this.items[i] = item;
        }
    }
    save(stream) {
        stream.writeUint32(this.items.length);
        for (let item of this.items) {
            item.save(stream);
        }
    }
    getByteLength() {
        return 4 + this.items.length * 8;
    }
}

/**
 * A random item table.
 */
class RandomItemTable {
    constructor() {
        this.id = 0;
        this.name = '';
        this.sets = [];
    }
    load(stream) {
        this.id = stream.readInt32();
        this.name = stream.readNull();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let set = new RandomItemSet$1();
            set.load(stream);
            this.sets[i] = set;
        }
    }
    save(stream) {
        stream.writeInt32(this.id);
        stream.writeNull(this.name);
        stream.writeUint32(this.sets.length);
        for (let set of this.sets) {
            set.save(stream);
        }
    }
    getByteLength() {
        let size = 9 + byteLengthUtf8(this.name);
        for (let set of this.sets) {
            size += set.getByteLength();
        }
        return size;
    }
}

/**
 * A random unit.
 */
class RandomUnit {
    constructor() {
        this.chance = 0;
        this.ids = [];
    }
    load(stream, positions) {
        this.chance = stream.readInt32();
        for (let i = 0; i < positions; i++) {
            this.ids[i] = stream.readBinary(4);
        }
    }
    save(stream) {
        stream.writeInt32(this.chance);
        for (let id of this.ids) {
            stream.writeBinary(id);
        }
    }
}

/**
 * A random unit table.
 */
class RandomUnitTable {
    constructor() {
        this.id = 0;
        this.name = '';
        this.positions = 0;
        this.columnTypes = new Int32Array(0);
        this.units = [];
    }
    load(stream) {
        this.id = stream.readInt32();
        this.name = stream.readNull();
        this.positions = stream.readInt32();
        this.columnTypes = stream.readInt32Array(this.positions);
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let unit = new RandomUnit();
            unit.load(stream, this.positions);
            this.units[i] = unit;
        }
    }
    save(stream) {
        stream.writeInt32(this.id);
        stream.writeNull(this.name);
        stream.writeInt32(this.positions);
        stream.writeInt32Array(this.columnTypes);
        stream.writeUint32(this.units.length);
        for (let unit of this.units) {
            unit.save(stream);
        }
    }
    getByteLength() {
        return 13 + byteLengthUtf8(this.name) + this.columnTypes.byteLength + (this.units.length * (4 + 4 * this.positions));
    }
}

/**
 * A tech availablity change.
 */
class TechAvailabilityChange {
    constructor() {
        this.playerFlags = 0;
        this.id = '\0\0\0\0';
    }
    load(stream) {
        this.playerFlags = stream.readUint32();
        this.id = stream.readBinary(4);
    }
    save(stream) {
        stream.writeUint32(this.playerFlags);
        stream.writeBinary(this.id);
    }
}

/**
 * An upgrade availability change.
 */
class UpgradeAvailabilityChange {
    constructor() {
        this.playerFlags = 0;
        this.id = '\0\0\0\0';
        this.levelAffected = 0;
        this.availability = 0;
    }
    load(stream) {
        this.playerFlags = stream.readUint32();
        this.id = stream.readBinary(4);
        this.levelAffected = stream.readInt32();
        this.availability = stream.readInt32();
    }
    save(stream) {
        stream.writeUint32(this.playerFlags);
        stream.writeBinary(this.id);
        stream.writeInt32(this.levelAffected);
        stream.writeInt32(this.availability);
    }
}

/**
 * war3map.w3i - the general information file.
 */
class War3MapW3i {
    constructor() {
        this.version = 0;
        this.saves = 0;
        this.editorVersion = 0;
        this.buildVersion = new Uint32Array(4);
        this.name = '';
        this.author = '';
        this.description = '';
        this.recommendedPlayers = '';
        this.cameraBounds = new Float32Array(8);
        this.cameraBoundsComplements = new Int32Array(4);
        this.playableSize = new Int32Array(2);
        this.flags = 0;
        this.tileset = 'A';
        this.campaignBackground = 0;
        this.loadingScreenModel = '';
        this.loadingScreenText = '';
        this.loadingScreenTitle = '';
        this.loadingScreenSubtitle = '';
        this.loadingScreen = 0;
        this.prologueScreenModel = '';
        this.prologueScreenText = '';
        this.prologueScreenTitle = '';
        this.prologueScreenSubtitle = '';
        this.useTerrainFog = 0;
        this.fogHeight = new Float32Array(2);
        this.fogDensity = 0;
        this.fogColor = new Uint8Array(4);
        this.globalWeather = 0;
        this.soundEnvironment = '';
        this.lightEnvironmentTileset = '\0';
        this.waterVertexColor = new Uint8Array(4);
        this.scriptMode = 0;
        this.graphicsMode = 0;
        this.players = [];
        this.forces = [];
        this.upgradeAvailabilityChanges = [];
        this.techAvailabilityChanges = [];
        this.randomUnitTables = [];
        this.randomItemTables = [];
        this.unknown1 = 0;
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readInt32();
        this.saves = stream.readInt32();
        this.editorVersion = stream.readInt32();
        if (this.version > 27) {
            stream.readUint32Array(this.buildVersion);
        }
        this.name = stream.readNull();
        this.author = stream.readNull();
        this.description = stream.readNull();
        this.recommendedPlayers = stream.readNull();
        stream.readFloat32Array(this.cameraBounds);
        stream.readInt32Array(this.cameraBoundsComplements);
        stream.readInt32Array(this.playableSize);
        this.flags = stream.readUint32();
        this.tileset = stream.readBinary(1);
        this.campaignBackground = stream.readInt32();
        if (this.version > 24) {
            this.loadingScreenModel = stream.readNull();
        }
        this.loadingScreenText = stream.readNull();
        this.loadingScreenTitle = stream.readNull();
        this.loadingScreenSubtitle = stream.readNull();
        this.loadingScreen = stream.readInt32();
        if (this.version > 24) {
            this.prologueScreenModel = stream.readNull();
        }
        this.prologueScreenText = stream.readNull();
        this.prologueScreenTitle = stream.readNull();
        this.prologueScreenSubtitle = stream.readNull();
        if (this.version > 24) {
            this.useTerrainFog = stream.readInt32();
            stream.readFloat32Array(this.fogHeight);
            this.fogDensity = stream.readFloat32();
            stream.readUint8Array(this.fogColor);
            this.globalWeather = stream.readInt32();
            this.soundEnvironment = stream.readNull();
            this.lightEnvironmentTileset = stream.readBinary(1);
            stream.readUint8Array(this.waterVertexColor);
        }
        if (this.version > 27) {
            this.scriptMode = stream.readUint32();
        }
        if (this.version > 30) {
            this.graphicsMode = stream.readUint32();
            this.unknown1 = stream.readUint32();
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let player = new Player();
            player.load(stream, this.version);
            this.players[i] = player;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let force = new Force();
            force.load(stream);
            this.forces[i] = force;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let upgradeAvailabilityChange = new UpgradeAvailabilityChange();
            upgradeAvailabilityChange.load(stream);
            this.upgradeAvailabilityChanges[i] = upgradeAvailabilityChange;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let techAvailabilityChange = new TechAvailabilityChange();
            techAvailabilityChange.load(stream);
            this.techAvailabilityChanges[i] = techAvailabilityChange;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let randomUnitTable = new RandomUnitTable();
            randomUnitTable.load(stream);
            this.randomUnitTables[i] = randomUnitTable;
        }
        if (this.version > 24) {
            for (let i = 0, l = stream.readInt32(); i < l; i++) {
                let randomItemTable = new RandomItemTable();
                randomItemTable.load(stream);
                this.randomItemTables[i] = randomItemTable;
            }
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        stream.writeInt32(this.saves);
        stream.writeInt32(this.editorVersion);
        if (this.version > 27) {
            stream.writeUint32Array(this.buildVersion);
        }
        stream.writeNull(this.name);
        stream.writeNull(this.author);
        stream.writeNull(this.description);
        stream.writeNull(this.recommendedPlayers);
        stream.writeFloat32Array(this.cameraBounds);
        stream.writeInt32Array(this.cameraBoundsComplements);
        stream.writeInt32Array(this.playableSize);
        stream.writeUint32(this.flags);
        stream.writeBinary(this.tileset);
        stream.writeInt32(this.campaignBackground);
        if (this.version > 24) {
            stream.writeNull(this.loadingScreenModel);
        }
        stream.writeNull(this.loadingScreenText);
        stream.writeNull(this.loadingScreenTitle);
        stream.writeNull(this.loadingScreenSubtitle);
        stream.writeInt32(this.loadingScreen);
        if (this.version > 24) {
            stream.writeNull(this.prologueScreenModel);
        }
        stream.writeNull(this.prologueScreenText);
        stream.writeNull(this.prologueScreenTitle);
        stream.writeNull(this.prologueScreenSubtitle);
        if (this.version > 24) {
            stream.writeInt32(this.useTerrainFog);
            stream.writeFloat32Array(this.fogHeight);
            stream.writeFloat32(this.fogDensity);
            stream.writeUint8Array(this.fogColor);
            stream.writeInt32(this.globalWeather);
            stream.writeNull(this.soundEnvironment);
            stream.writeBinary(this.lightEnvironmentTileset);
            stream.writeUint8Array(this.waterVertexColor);
        }
        if (this.version > 27) {
            stream.writeUint32(this.scriptMode);
        }
        if (this.version > 30) {
            stream.writeUint32(this.graphicsMode);
            stream.writeUint32(this.unknown1);
        }
        stream.writeUint32(this.players.length);
        for (let player of this.players) {
            player.save(stream, this.version);
        }
        stream.writeUint32(this.forces.length);
        for (let force of this.forces) {
            force.save(stream);
        }
        stream.writeUint32(this.upgradeAvailabilityChanges.length);
        for (let change of this.upgradeAvailabilityChanges) {
            change.save(stream);
        }
        stream.writeUint32(this.techAvailabilityChanges.length);
        for (let change of this.techAvailabilityChanges) {
            change.save(stream);
        }
        stream.writeUint32(this.randomUnitTables.length);
        for (let table of this.randomUnitTables) {
            table.save(stream);
        }
        if (this.version > 24) {
            stream.writeUint32(this.randomItemTables.length);
            for (let table of this.randomItemTables) {
                table.save(stream);
            }
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 111 + byteLengthUtf8(this.name) + byteLengthUtf8(this.author) + byteLengthUtf8(this.description) + byteLengthUtf8(this.recommendedPlayers) + byteLengthUtf8(this.loadingScreenText) + byteLengthUtf8(this.loadingScreenTitle) + byteLengthUtf8(this.loadingScreenSubtitle) + byteLengthUtf8(this.prologueScreenText) + byteLengthUtf8(this.prologueScreenTitle) + byteLengthUtf8(this.prologueScreenSubtitle);
        for (let player of this.players) {
            size += player.getByteLength(this.version);
        }
        for (let force of this.forces) {
            size += force.getByteLength();
        }
        size += this.upgradeAvailabilityChanges.length * 16;
        size += this.techAvailabilityChanges.length * 8;
        for (let table of this.randomUnitTables) {
            size += table.getByteLength();
        }
        if (this.version > 24) {
            size += 36 + byteLengthUtf8(this.loadingScreenModel) + byteLengthUtf8(this.prologueScreenModel) + byteLengthUtf8(this.soundEnvironment);
            for (let table of this.randomItemTables) {
                size += table.getByteLength();
            }
        }
        return size;
    }
}

var w3i = {
    File: War3MapW3i,
    Player,
    Force,
    UpgradeAvailabilityChange,
    TechAvailabilityChange,
    RandomUnitTable,
    RandomUnit,
    RandomItemTable,
    RandomItemSet: RandomItemSet$1,
    RandomItem: RandomItem$1,
};

/**
 * war3map.w3o - the combined modification file.
 *
 * Contains all of the modifications of a map.
 * Can be exported and imported via the World Editor.
 */
class War3MapW3o {
    constructor() {
        this.version = 0;
        this.units = null;
        this.items = null;
        this.destructables = null;
        this.doodads = null;
        this.abilities = null;
        this.buffs = null;
        this.upgrades = null;
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readInt32();
        if (stream.readInt32()) {
            this.units = new War3MapW3u();
            this.units.load(stream);
        }
        if (stream.readInt32()) {
            this.items = new War3MapW3u();
            this.items.load(stream);
        }
        if (stream.readInt32()) {
            this.destructables = new War3MapW3u();
            this.destructables.load(stream);
        }
        if (stream.readInt32()) {
            this.doodads = new War3MapW3d();
            this.doodads.load(stream);
        }
        if (stream.readInt32()) {
            this.abilities = new War3MapW3d();
            this.abilities.load(stream);
        }
        if (stream.readInt32()) {
            this.buffs = new War3MapW3u();
            this.buffs.load(stream);
        }
        if (stream.readInt32()) {
            this.upgrades = new War3MapW3d();
            this.upgrades.load(stream);
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        if (this.units) {
            stream.writeInt32(1);
            stream.writeUint8Array(this.units.save());
        }
        else {
            stream.writeInt32(0);
        }
        if (this.items) {
            stream.writeInt32(1);
            stream.writeUint8Array(this.items.save());
        }
        else {
            stream.writeInt32(0);
        }
        if (this.destructables) {
            stream.writeInt32(1);
            stream.writeUint8Array(this.destructables.save());
        }
        else {
            stream.writeInt32(0);
        }
        if (this.doodads) {
            stream.writeInt32(1);
            stream.writeUint8Array(this.doodads.save());
        }
        else {
            stream.writeInt32(0);
        }
        if (this.abilities) {
            stream.writeInt32(1);
            stream.writeUint8Array(this.abilities.save());
        }
        else {
            stream.writeInt32(0);
        }
        if (this.buffs) {
            stream.writeInt32(1);
            stream.writeUint8Array(this.buffs.save());
        }
        else {
            stream.writeInt32(0);
        }
        if (this.upgrades) {
            stream.writeInt32(1);
            stream.writeUint8Array(this.upgrades.save());
        }
        else {
            stream.writeInt32(0);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 32;
        if (this.units) {
            size += this.units.getByteLength();
        }
        if (this.items) {
            size += this.items.getByteLength();
        }
        if (this.destructables) {
            size += this.destructables.getByteLength();
        }
        if (this.doodads) {
            size += this.doodads.getByteLength();
        }
        if (this.abilities) {
            size += this.abilities.getByteLength();
        }
        if (this.buffs) {
            size += this.buffs.getByteLength();
        }
        if (this.upgrades) {
            size += this.upgrades.getByteLength();
        }
        return size;
    }
}

var w3o = {
    File: War3MapW3o,
};

/**
 * A region.
 */
class Region {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.bottom = 0;
        this.top = 0;
        this.name = '';
        this.creationNumber = 0;
        this.weatherEffectId = '\0\0\0\0';
        this.ambientSound = '';
        this.color = new Uint8Array(4);
    }
    load(stream) {
        this.left = stream.readFloat32();
        this.right = stream.readFloat32();
        this.bottom = stream.readFloat32();
        this.top = stream.readFloat32();
        this.name = stream.readNull();
        this.creationNumber = stream.readUint32();
        this.weatherEffectId = stream.readBinary(4);
        this.ambientSound = stream.readNull();
        stream.readUint8Array(this.color);
    }
    save(stream) {
        stream.writeFloat32(this.left);
        stream.writeFloat32(this.right);
        stream.writeFloat32(this.bottom);
        stream.writeFloat32(this.top);
        stream.writeNull(this.name);
        stream.writeUint32(this.creationNumber);
        if (this.weatherEffectId) {
            stream.writeBinary(this.weatherEffectId);
        }
        else {
            stream.writeUint32(0);
        }
        stream.writeNull(this.ambientSound);
        stream.writeUint8Array(this.color);
    }
    getByteLength() {
        return 30 + byteLengthUtf8(this.name) + byteLengthUtf8(this.ambientSound);
    }
}

/**
 * war3map.w3r - the region file.
 */
class War3MapW3r {
    constructor() {
        this.version = 0;
        this.regions = [];
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let region = new Region();
            region.load(stream);
            this.regions[i] = region;
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        stream.writeUint32(this.regions.length);
        for (let region of this.regions) {
            region.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 8;
        for (let region of this.regions) {
            size += region.getByteLength();
        }
        return size;
    }
}

var w3r = {
    File: War3MapW3r,
    Region,
};

/**
 * A sound.
 */
class Sound {
    constructor() {
        this.name = '';
        this.file = '';
        this.eaxEffect = '';
        this.flags = 0;
        this.fadeInRate = 0;
        this.fadeOutRate = 0;
        this.volume = 0;
        this.pitch = 0;
        this.u1 = 0;
        this.u2 = 0;
        this.channel = 0;
        this.minDistance = 0;
        this.maxDistance = 0;
        this.distanceCutoff = 0;
        this.u3 = 0;
        this.u4 = 0;
        this.u5 = 0;
        this.u6 = 0;
        this.u7 = 0;
        this.u8 = 0;
    }
    load(stream) {
        this.name = stream.readNull();
        this.file = stream.readNull();
        this.eaxEffect = stream.readNull();
        this.flags = stream.readUint32();
        this.fadeInRate = stream.readInt32();
        this.fadeOutRate = stream.readInt32();
        this.volume = stream.readInt32();
        this.pitch = stream.readFloat32();
        this.u1 = stream.readFloat32();
        this.u2 = stream.readInt32();
        this.channel = stream.readInt32();
        this.minDistance = stream.readFloat32();
        this.maxDistance = stream.readFloat32();
        this.distanceCutoff = stream.readFloat32();
        this.u3 = stream.readFloat32();
        this.u4 = stream.readFloat32();
        this.u5 = stream.readInt32();
        this.u6 = stream.readFloat32();
        this.u7 = stream.readFloat32();
        this.u8 = stream.readFloat32();
    }
    save(stream) {
        stream.writeNull(this.name);
        stream.writeNull(this.file);
        stream.writeNull(this.eaxEffect);
        stream.writeUint32(this.flags);
        stream.writeUint32(this.fadeInRate);
        stream.writeUint32(this.fadeOutRate);
        stream.writeUint32(this.volume);
        stream.writeFloat32(this.pitch);
        stream.writeFloat32(this.u1);
        stream.writeInt32(this.u2);
        stream.writeInt32(this.channel);
        stream.writeFloat32(this.minDistance);
        stream.writeFloat32(this.maxDistance);
        stream.writeFloat32(this.distanceCutoff);
        stream.writeFloat32(this.u3);
        stream.writeFloat32(this.u4);
        stream.writeInt32(this.u5);
        stream.writeFloat32(this.u6);
        stream.writeFloat32(this.u7);
        stream.writeFloat32(this.u8);
    }
    getByteLength() {
        return 71 + byteLengthUtf8(this.name) + byteLengthUtf8(this.file) + byteLengthUtf8(this.eaxEffect);
    }
}

/**
 * war3map.w3s - the sound file.
 */
class War3MapW3s {
    constructor() {
        this.version = 0;
        this.sounds = [];
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let sound = new Sound();
            sound.load(stream);
            this.sounds[i] = sound;
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        stream.writeUint32(this.sounds.length);
        for (let sound of this.sounds) {
            sound.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 8;
        for (let sound of this.sounds) {
            size += sound.getByteLength();
        }
        return size;
    }
}

var w3s = {
    File: War3MapW3s,
    Sound,
};

var w3u = {
    File: War3MapW3u,
    ModificationTable,
    ModificationObject: ModifiedObject,
    Modification,
};

var wct = {
    File: War3MapWct,
    CustomTextTrigger,
};

/**
 * war3map.wpm - the pathing file.
 */
class War3MapWpm {
    constructor() {
        this.version = 0;
        this.size = new Int32Array(2);
        this.pathing = new Uint8Array(0);
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        if (stream.readBinary(4) !== 'MP3W') {
            return;
        }
        this.version = stream.readInt32();
        stream.readInt32Array(this.size);
        this.pathing = stream.readUint8Array(this.size[0] * this.size[1]);
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeBinary('MP3W');
        stream.writeInt32(this.version);
        stream.writeInt32Array(this.size);
        stream.writeUint8Array(this.pathing);
        return stream.uint8array;
    }
    getByteLength() {
        return 16 + (this.size[0] * this.size[1]);
    }
}

var wpm = {
    File: War3MapWpm,
};

/**
 * An INI file.
 */
class IniFile {
    constructor() {
        this.properties = new Map();
        this.sections = new Map();
    }
    load(buffer) {
        // All properties added until a section is reached are added to the properties map.
        // Once a section is reached, any further properties will be added to it until matching another section, etc.
        let section = this.properties;
        let sections = this.sections;
        for (let line of buffer.split('\r\n')) {
            // INI defines comments as starting with a semicolon ';'.
            // However, Warcraft 3 INI files use normal C comments '//'.
            // In addition, Warcraft 3 files have empty lines.
            // Therefore, ignore any line matching any of these conditions.
            if (line.length && !line.startsWith('//') && !line.startsWith(';')) {
                let match = line.match(/^\[(.+?)\]/);
                if (match) {
                    let name = match[1].trim().toLowerCase();
                    section = sections.get(name);
                    if (!section) {
                        section = new Map();
                        sections.set(name, section);
                    }
                }
                else {
                    match = line.match(/^(.+?)=(.*?)$/);
                    if (match) {
                        section.set(match[1].toLowerCase(), match[2]);
                    }
                }
            }
        }
    }
    save() {
        let lines = [];
        for (let [key, value] of this.properties) {
            lines.push(`${key}=${value}`);
        }
        for (let [name, section] of this.sections) {
            lines.push(`[${name}]`);
            for (let [key, value] of section) {
                lines.push(`${key}=${value}`);
            }
        }
        return lines.join('\r\n');
    }
    getSection(name) {
        return this.sections.get(name.toLowerCase());
    }
}

/**
 * Trigger data needed to load a WTG file.
 */
class TriggerData {
    constructor() {
        this.types = {};
        this.functions = [{}, {}, {}, {}];
        this.presets = {};
        this.externalTypes = {};
        this.externalFunctions = [{}, {}, {}, {}];
        this.externalPresets = {};
    }
    addTriggerData(buffer, isExternal) {
        let types = this.types;
        let functions = this.functions;
        let presets = this.presets;
        if (isExternal) {
            types = this.externalTypes;
            functions = this.externalFunctions;
            presets = this.externalPresets;
        }
        let triggerData = new IniFile();
        triggerData.load(buffer);
        let section = triggerData.getSection('TriggerTypes');
        if (section) {
            this.addTriggerTypes(types, section);
        }
        section = triggerData.getSection('TriggerEvents');
        if (section) {
            this.addTriggerDataFunctions(functions[0], section, 1);
        }
        section = triggerData.getSection('TriggerConditions');
        if (section) {
            this.addTriggerDataFunctions(functions[1], section, 1);
        }
        section = triggerData.getSection('TriggerActions');
        if (section) {
            this.addTriggerDataFunctions(functions[2], section, 1);
        }
        section = triggerData.getSection('TriggerCalls');
        if (section) {
            this.addTriggerDataFunctions(functions[3], section, 3);
        }
        section = triggerData.getSection('TriggerParams');
        if (section) {
            this.addTriggerDataPresets(presets, section);
        }
    }
    addTriggerTypes(types, section) {
        for (let [key, value] of section) {
            let tokens = value.split(',');
            types[key] = tokens[4] || '';
        }
    }
    addTriggerDataFunctions(functions, section, skipped) {
        for (let [key, value] of section) {
            // We don't care about metadata lines.
            if (key[0] !== '_') {
                let tokens = value.split(',').slice(skipped);
                let args = [];
                // Can be used by actions to make aliases.
                let scriptName = section.get(`_${key}_scriptname`) || null;
                for (let argument of tokens) {
                    // We don't care about constants.
                    if (Number.isNaN(parseFloat(argument)) && argument !== 'nothing' && argument !== '') {
                        args.push(argument);
                    }
                }
                functions[key] = { args, scriptName };
            }
        }
    }
    addTriggerDataPresets(presets, section) {
        for (let [key, value] of section) {
            let tokens = value.split(',');
            // Note that the operators are enclosed by "" for some reason.
            // Note that string literals are enclosed by backticks.
            presets[key] = tokens[2].replace(/"/g, '').replace(/`/g, '"');
        }
    }
    /**
     * Given a type, return its base type.
     *
     * Returns the given type if its not a child type.
     */
    getBaseType(type) {
        type = type.toLowerCase();
        let base = this.types[type];
        if (base === undefined) {
            base = this.externalTypes[type];
        }
        // Same as !base, but be explicit to be clearer.
        if (base === '' || base === undefined) {
            return type;
        }
        return base;
    }
    isBaseFunction(type, name) {
        name = name.toLowerCase();
        if (this.functions[type][name]) {
            return true;
        }
        return false;
    }
    /**
     * Gets the signature of the given function.
     */
    getFunction(type, name) {
        name = name.toLowerCase();
        let args = this.functions[type][name];
        if (!args) {
            args = this.externalFunctions[type][name];
        }
        return args;
    }
    /**
     * Get the type of a function given its name.
     * Returns -1 if the function isn't recognized.
     */
    getFunctionType(name) {
        name = name.toLowerCase();
        let functions = this.functions;
        for (let i = 0; i < 4; i++) {
            if (functions[i][name]) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Gets a preset value.
     */
    getPreset(name) {
        name = name.toLowerCase();
        let preset = this.presets[name];
        if (preset === undefined) {
            preset = this.externalPresets[name];
        }
        return preset;
    }
    /**
     * Is the given preset a custom or standard one?
     */
    isCustomPreset(name) {
        name = name.toLowerCase();
        if (this.presets[name] !== undefined) {
            return false;
        }
        if (this.externalPresets[name] !== undefined) {
            return true;
        }
        throw new Error(`Failed to find a preset: ${name}`);
    }
}

var wtg = {
    File: War3MapWtg,
    TriggerCategory,
    Variable,
    Trigger,
    ECA,
    Parameter,
    SubParameters,
    TriggerData,
};

var wts = {
    File: War3MapWts,
};

/**
 * A dropped item.
 */
class DroppedItem {
    constructor() {
        this.id = '\0\0\0\0';
        this.chance = 0;
    }
    load(stream) {
        this.id = stream.readBinary(4);
        this.chance = stream.readInt32();
    }
    save(stream) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.chance);
    }
}

/**
 * A dropped item set.
 */
class DroppedItemSet {
    constructor() {
        this.items = [];
    }
    load(stream) {
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let item = new DroppedItem();
            item.load(stream);
            this.items[i] = item;
        }
    }
    save(stream) {
        stream.writeInt32(this.items.length);
        for (let item of this.items) {
            item.save(stream);
        }
    }
    getByteLength() {
        return 4 + this.items.length * 8;
    }
}

/**
 * An inventory item.
 */
class InventoryItem {
    constructor() {
        this.slot = 0;
        this.id = '\0\0\0\0';
    }
    load(stream) {
        this.slot = stream.readInt32();
        this.id = stream.readBinary(4);
    }
    save(stream) {
        stream.writeInt32(this.slot);
        stream.writeBinary(this.id);
    }
}

/**
 * A modified ability.
 */
class ModifiedAbility {
    constructor() {
        this.id = '\0\0\0\0';
        this.activeForAutocast = 0;
        this.heroLevel = 1;
    }
    load(stream) {
        this.id = stream.readBinary(4);
        this.activeForAutocast = stream.readInt32();
        this.heroLevel = stream.readInt32();
    }
    save(stream) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.activeForAutocast);
        stream.writeInt32(this.heroLevel);
    }
}

/**
 * A random unit.
 */
class RandomUnit$1 {
    constructor() {
        this.id = '\0\0\0\0';
        this.chance = 0;
    }
    load(stream) {
        this.id = stream.readBinary(4);
        this.chance = stream.readInt32();
    }
    save(stream) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.chance);
    }
}

/**
 * A unit.
 */
class Unit {
    constructor() {
        this.id = '\0\0\0\0';
        this.variation = 0;
        this.location = new Float32Array(3);
        this.angle = 0;
        this.scale = new Float32Array([1, 1, 1]);
        /**
         * @since Game version 1.32
         */
        this.skin = '\0\0\0\0';
        this.flags = 0;
        this.player = 0;
        this.unknown = 0;
        this.hitpoints = -1;
        this.mana = -1;
        /**
         * @since 8
         */
        this.droppedItemTable = 0;
        this.droppedItemSets = [];
        this.goldAmount = 0;
        this.targetAcquisition = 0;
        this.heroLevel = 0;
        /**
         * @since 8
         */
        this.heroStrength = 0;
        /**
         * @since 8
         */
        this.heroAgility = 0;
        /**
         * @since 8
         */
        this.heroIntelligence = 0;
        this.itemsInInventory = [];
        this.modifiedAbilities = [];
        this.randomFlag = 0;
        this.level = new Uint8Array(3);
        this.itemClass = 0;
        this.unitGroup = 0;
        this.positionInGroup = 0;
        this.randomUnitTables = [];
        this.customTeamColor = 0;
        this.waygate = 0;
        this.creationNumber = 0;
    }
    load(stream, version, subversion, isReforged) {
        this.id = stream.readBinary(4);
        this.variation = stream.readInt32();
        stream.readFloat32Array(this.location);
        this.angle = stream.readFloat32();
        stream.readFloat32Array(this.scale);
        if (isReforged) {
            this.skin = stream.readBinary(4);
        }
        this.flags = stream.readUint8();
        this.player = stream.readInt32();
        this.unknown = stream.readUint16();
        this.hitpoints = stream.readInt32();
        this.mana = stream.readInt32();
        if (subversion > 10) {
            this.droppedItemTable = stream.readInt32();
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let set = new DroppedItemSet();
            set.load(stream);
            this.droppedItemSets[i] = set;
        }
        this.goldAmount = stream.readInt32();
        this.targetAcquisition = stream.readFloat32();
        this.heroLevel = stream.readInt32();
        if (subversion > 10) {
            this.heroStrength = stream.readInt32();
            this.heroAgility = stream.readInt32();
            this.heroIntelligence = stream.readInt32();
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let item = new InventoryItem();
            item.load(stream);
            this.itemsInInventory[i] = item;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let modifiedAbility = new ModifiedAbility();
            modifiedAbility.load(stream);
            this.modifiedAbilities[i] = modifiedAbility;
        }
        this.randomFlag = stream.readInt32();
        if (this.randomFlag === 0) {
            stream.readUint8Array(this.level); // 24bit number
            this.itemClass = stream.readUint8();
        }
        else if (this.randomFlag === 1) {
            this.unitGroup = stream.readUint32();
            this.positionInGroup = stream.readUint32();
        }
        else if (this.randomFlag === 2) {
            for (let i = 0, l = stream.readInt32(); i < l; i++) {
                let randomUnit = new RandomUnit$1();
                randomUnit.load(stream);
                this.randomUnitTables[i] = randomUnit;
            }
        }
        this.customTeamColor = stream.readInt32();
        this.waygate = stream.readInt32();
        this.creationNumber = stream.readInt32();
    }
    save(stream, version, subversion, isReforged) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.variation);
        stream.writeFloat32Array(this.location);
        stream.writeFloat32(this.angle);
        stream.writeFloat32Array(this.scale);
        if (isReforged) {
            stream.writeBinary(this.skin);
        }
        stream.writeUint8(this.flags);
        stream.writeInt32(this.player);
        stream.writeUint16(this.unknown);
        stream.writeInt32(this.hitpoints);
        stream.writeInt32(this.mana);
        if (subversion > 10) {
            stream.writeInt32(this.droppedItemTable);
        }
        stream.writeInt32(this.droppedItemSets.length);
        for (let droppedItemSet of this.droppedItemSets) {
            droppedItemSet.save(stream);
        }
        stream.writeInt32(this.goldAmount);
        stream.writeFloat32(this.targetAcquisition);
        stream.writeInt32(this.heroLevel);
        if (subversion > 10) {
            stream.writeInt32(this.heroStrength);
            stream.writeInt32(this.heroAgility);
            stream.writeInt32(this.heroIntelligence);
        }
        stream.writeInt32(this.itemsInInventory.length);
        for (let itemInInventory of this.itemsInInventory) {
            itemInInventory.save(stream);
        }
        stream.writeInt32(this.modifiedAbilities.length);
        for (let modifiedAbility of this.modifiedAbilities) {
            modifiedAbility.save(stream);
        }
        stream.writeInt32(this.randomFlag);
        if (this.randomFlag === 0) {
            stream.writeUint8Array(this.level);
            stream.writeUint8(this.itemClass);
        }
        else if (this.randomFlag === 1) {
            stream.writeUint32(this.unitGroup);
            stream.writeUint32(this.positionInGroup);
        }
        else if (this.randomFlag === 2) {
            stream.writeInt32(this.randomUnitTables.length);
            for (let randomUnitTable of this.randomUnitTables) {
                randomUnitTable.save(stream);
            }
        }
        stream.writeInt32(this.customTeamColor);
        stream.writeInt32(this.waygate);
        stream.writeInt32(this.creationNumber);
    }
    getByteLength(version, subversion, isReforged) {
        let size = 91;
        if (isReforged) {
            size += 4;
        }
        if (subversion > 10) {
            size += 16;
        }
        for (let droppedItemSet of this.droppedItemSets) {
            size += droppedItemSet.getByteLength();
        }
        size += this.itemsInInventory.length * 8;
        size += this.modifiedAbilities.length * 12;
        if (this.randomFlag === 0) {
            size += 4;
        }
        else if (this.randomFlag === 1) {
            size += 8;
        }
        else if (this.randomFlag === 2) {
            size += 4 + this.randomUnitTables.length * 8;
        }
        return size;
    }
}

/**
 * war3mapUnits.doo - the units and items file.
 */
class War3MapUnitsDoo {
    constructor() {
        this.version = 8;
        this.subversion = 11;
        this.units = [];
    }
    load(buffer, isReforged) {
        let stream = new BinaryStream(buffer);
        if (stream.readBinary(4) !== 'W3do') {
            return;
        }
        this.version = stream.readInt32();
        this.subversion = stream.readUint32();
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            let unit = new Unit();
            unit.load(stream, this.version, this.subversion, isReforged);
            this.units[i] = unit;
        }
    }
    save(isReforged) {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength(isReforged)));
        stream.writeBinary('W3do');
        stream.writeInt32(this.version);
        stream.writeUint32(this.subversion);
        stream.writeInt32(this.units.length);
        for (let unit of this.units) {
            unit.save(stream, this.version, this.subversion, isReforged);
        }
        return stream.uint8array;
    }
    getByteLength(isReforged) {
        let size = 16;
        for (let unit of this.units) {
            size += unit.getByteLength(this.version, this.subversion, isReforged);
        }
        return size;
    }
}

var unitsdoo = {
    File: War3MapUnitsDoo,
    Unit,
    DroppedItemSet,
    DroppedItem,
    InventoryItem,
    ModifiedAbility,
    RandomUnit: RandomUnit$1,
};

/**
 * A map title.
 */
class MapTitle {
    constructor() {
        this.visible = 0;
        this.chapterTitle = '';
        this.mapTitle = '';
        this.path = '';
    }
    load(stream) {
        this.visible = stream.readInt32();
        this.chapterTitle = stream.readNull();
        this.mapTitle = stream.readNull();
        this.path = stream.readNull();
    }
    save(stream) {
        stream.writeInt32(this.visible);
        stream.writeNull(this.chapterTitle);
        stream.writeNull(this.mapTitle);
        stream.writeNull(this.path);
    }
    getByteLength() {
        return 7 + byteLengthUtf8(this.chapterTitle) + byteLengthUtf8(this.mapTitle) + byteLengthUtf8(this.path);
    }
}

/**
 * A map order.
 */
class MapOrder {
    constructor() {
        this.u1 = 0;
        this.path = '';
    }
    load(stream) {
        this.u1 = stream.readInt8();
        this.path = stream.readNull();
    }
    save(stream) {
        stream.writeInt8(this.u1);
        stream.writeNull(this.path);
    }
    getByteLength() {
        return 2 + byteLengthUtf8(this.path);
    }
}

/**
 * war3campaign.w3f - the campaign information file.
 */
class War3CampaignW3f {
    constructor() {
        this.version = 0;
        this.campaignVersion = 0;
        this.editorVersion = 0;
        this.name = '';
        this.difficulty = '';
        this.author = '';
        this.description = '';
        this.mode = -1; // 0: fixed difficulty, only w3m maps, 1: variable difficulty, only w3m maps, 1: fixed..., contains w3x maps, 2: variable..., contains w3xm maps.
        this.backgroundScreen = -1; // -1 = none or custom path
        this.backgroundScreenPath = '';
        this.minimapImagePath = '';
        this.ambientSound = 0; // -1 = imported, 0 = none, >0 = preset index
        this.ambientSoundPath = '';
        this.terrainFog = 0; // 0 = not used, >0 = index of terrain fog style
        this.fogStartZ = 0;
        this.fogEndZ = 0;
        this.fogDensity = 0;
        this.fogColor = new Uint8Array(4);
        this.userInterface = -1; // 0 = human
        this.mapTitles = [];
        this.mapOrders = [];
    }
    load(buffer) {
        let stream = new BinaryStream(buffer);
        this.version = stream.readInt32();
        this.campaignVersion = stream.readInt32();
        this.editorVersion = stream.readInt32();
        this.name = stream.readNull();
        this.difficulty = stream.readNull();
        this.author = stream.readNull();
        this.description = stream.readNull();
        this.mode = stream.readInt32();
        this.backgroundScreen = stream.readInt32();
        this.backgroundScreenPath = stream.readNull();
        this.minimapImagePath = stream.readNull();
        this.ambientSound = stream.readInt32();
        this.ambientSoundPath = stream.readNull();
        this.terrainFog = stream.readInt32();
        this.fogStartZ = stream.readFloat32();
        this.fogEndZ = stream.readFloat32();
        this.fogDensity = stream.readFloat32();
        stream.readUint8Array(this.fogColor);
        this.userInterface = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let mapTitle = new MapTitle();
            mapTitle.load(stream);
            this.mapTitles[i] = mapTitle;
        }
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            let mapOrder = new MapOrder();
            mapOrder.load(stream);
            this.mapOrders[i] = mapOrder;
        }
    }
    save() {
        let stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        stream.writeInt32(this.campaignVersion);
        stream.writeInt32(this.editorVersion);
        stream.writeNull(this.name);
        stream.writeNull(this.difficulty);
        stream.writeNull(this.author);
        stream.writeNull(this.description);
        stream.writeInt32(this.mode);
        stream.writeInt32(this.backgroundScreen);
        stream.writeNull(this.backgroundScreenPath);
        stream.writeNull(this.minimapImagePath);
        stream.writeInt32(this.ambientSound);
        stream.writeNull(this.ambientSoundPath);
        stream.writeInt32(this.terrainFog);
        stream.writeFloat32(this.fogStartZ);
        stream.writeFloat32(this.fogEndZ);
        stream.writeFloat32(this.fogDensity);
        stream.writeUint8Array(this.fogColor);
        stream.writeInt32(this.userInterface);
        stream.writeUint32(this.mapTitles.length);
        for (let title of this.mapTitles) {
            title.save(stream);
        }
        stream.writeUint32(this.mapOrders.length);
        for (let order of this.mapOrders) {
            order.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 63 + byteLengthUtf8(this.name) + byteLengthUtf8(this.difficulty) + byteLengthUtf8(this.author) + byteLengthUtf8(this.description) + byteLengthUtf8(this.backgroundScreenPath) + byteLengthUtf8(this.minimapImagePath) + byteLengthUtf8(this.ambientSoundPath);
        for (let title of this.mapTitles) {
            size += title.getByteLength();
        }
        for (let order of this.mapOrders) {
            size += order.getByteLength();
        }
        return size;
    }
}

var w3f = {
    File: War3CampaignW3f,
    MapTitle,
    MapOrder,
};

export {
    War3Map,
    doo,
    imp,
    mmp,
    shd,
    w3c,
    w3d,
    w3e,
    w3i,
    w3o,
    w3r,
    w3s,
    w3u,
    wct,
    wpm,
    wtg,
    wts,
    unitsdoo,
    w3f,
};

export default War3Map;
