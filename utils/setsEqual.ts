/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * https://stackoverflow.com/a/56635107
 * check if two sets are equal in the sense that
 * they have a matching set of values.
 *
 * @param {Set} a
 * @param {Set} b
 * @returns {Boolean}
 */
const setsEqual = (a: Set<any>, b: Set<any>) =>
	a.size === b.size ? [...a].every(value => b.has(value)) : false

export default setsEqual
