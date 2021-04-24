/**
 *
 * @export
 * @interface ModelFieldError
 */
export type ModelFieldError = {
  /**
   *
   * @type {string}
   * @memberof ModelFieldError
   */
  readonly field?: string | null;
  /**
   *
   * @type {Array<string>}
   * @memberof ModelFieldError
   */
  readonly messages?: string[] | null;
}
