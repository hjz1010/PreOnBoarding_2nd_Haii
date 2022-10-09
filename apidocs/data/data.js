/**
 * @swagger
 *
 * /data:
 *  post:
 *    security:
 *      - Authorization: []
 *    summary: "데이터 입력 기능"
 *    description:
 *    tags: [data]
 *    parameters:
 *     - in: path
 *       name: token
 *       required: true
 *       description: 권한 확인용 토큰
 *       schema:
 *        type: string
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
 *                description: "토큰"
 *                example: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NjUxOTk0MDIsImV4cCI6MTY2NTIwMzAwMn0.oEZCttrmA9VIahwXMkDyX63W6PL_Q3hTE0PCAZs3o6g", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUxOTk0MDIsImV4cCI6MTY2NjQwOTAwMn0.aTvRrwSZDYRrwGBX-F6cGIZ3oz_uHFStJGXrwxUp3UU"]
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
 *                    example: 400
 *                message:
 *                    type: string
 *                    example: "유저 인증이 필요합니다."
 *      401:
 *        description: 권한이 없는 회원
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                    type: number
 *                    example: 401
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
