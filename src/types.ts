/**
 *
 * @export
 * @interface ModelFieldError
 */
export interface ModelFieldError {
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
