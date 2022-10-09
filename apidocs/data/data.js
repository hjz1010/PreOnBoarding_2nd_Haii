/**
 * @swagger
 *
 * /data:
 *  post:
 *  security:
 *      - Authorization: []
 *  summary: "데이터 입력 기능"
 *  description:
 *    tags: [data]
 *    requestheader:
 *      description: 회원의 권한 확인 후 데이터 입력
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                token: "token"
 *    responses:
 *      400:
 *        description: 토큰 미지급
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                    type: number
 *                    example: 403
 *                message:
 *                    type: string
 *                    example: "유저 인증이 필요합니다."
 *      402:
 *        description: 권한이 없는 회원
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                    type: number
 *                    example: 402
 *                message:
 *                    type: string
 *                    example: "인증에 실패하였습니다."
 *      404:
 *        description: 존재하지 않는 유저
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                    type: number
 *                    example: 404
 *                  message:
 *                    type: string
 *                    example: "유저가 존재하지 않습니다."
 *      403:
 *        description: 데이터 접근 권한이 없는 유저일때
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                    type: number
 *                    example: 403
 *                  message:
 *                    type: string
 *                    example: "데이터 접근 권한이 없습니다."
 *      200:
 *        description: 데이터 입력 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                    type: number
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: "데이터 입력 성공!"
 *
 *
 *
 *
 */
