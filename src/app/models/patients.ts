export interface Patients {
  datum: string,
  vek: number,
  pohlavi: string,
  kraj_nuts_kod: string,
  okres_lau_kod: string,
  nakaza_v_zahranici?: boolean,
  nakaza_zeme_csu_kod?: string
}
