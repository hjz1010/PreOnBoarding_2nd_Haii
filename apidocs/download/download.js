/**
 * @swagger
 *
 * /download:
 *   get:
 *    tags:
 *      - download
 *    summary: "데이터 다운로드 기능"
 *    description: 사용자가 접근 가능한 데이터를 .xlsx 형태로 다운로드 합니다.
 *    responses:
 *      '200':
 *        description: 다운로드 성공
 *      '403':
 *        description: 토큰 미지급/토큰 인증 실패/토큰 데이터 누락
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                    type: string
 *                    example: "유저 인증이 필요합니다./인증에 실패하였습니다./유저 아이디가 없습니다./유저 유형이 없습니다."
 *
 *
 *      '404':
 *        description: 검색결과 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                    type: string
 *                    example: "검색 결과가 없습니다."
 * /download/search:
 *  get:
 *    tags:
 *      - download
 *    summary: "데이터 다운로드 기능"
 *    description: 사용자가 접근 가능한 데이터에서 검색된 데이터를 .xlsx 형태로 다운로드 합니다.
 *    parameters:
 *      - name: type
 *        in: query
 *        description: 검색어 (치매센터유형)
 *        required: false
 *        explode: true
 *        schema:
 *          type: integer
 *          enum:
 *            - 1
 *            - 2
 *            - 3
 *      - name: name
 *        in: query
 *        description: 검색어 (치매센터명)
 *        required: false
 *        explode: true
 *        schema:
 *          type: string
 *      - name: rep
 *        in: query
 *        description: 검색어 (운영기관대표자명)
 *        required: false
 *        explode: true
 *        schema:
 *          type: string
 *      - name: contact
 *        in: query
 *        description: 검색어 (운영기관전화번호)
 *        required: false
 *        explode: true
 *        schema:
 *          type: string
 *      - name: doctor
 *        in: query
 *        description: 검색어 (의사인원수)
 *        required: false
 *        explode: true
 *        schema:
 *         type: integer
 *      - name: nurse
 *        in: query
 *        description: 검색어 (간호사인원수)
 *        required: false
 *        explode: true
 *        schema:
 *          type: integer
 *      - name: social
 *        in: query
 *        description: 검색어 (사회복지사인원수)
 *        required: false
 *        explode: true
 *        schema:
 *          type: integer
 *
 *    responses:
 *      '200':
 *        description: 다운로드 성공
 *      '403':
 *        description: 토큰 미지급/토큰 인증 실패/토큰 데이터 누락
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                    type: string
 *                    example: "유저 인증이 필요합니다./인증에 실패하였습니다./유저 아이디가 없습니다./유저 유형이 없습니다."
 *
 *
 *      '404':
 *        description: 검색결과 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                    type: string
 *                    example: "검색 결과가 없습니다."
 *
 */
