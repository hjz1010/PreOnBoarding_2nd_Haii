/**
* @swagger
*
* /users/{userId}:
*  patch:
*    security:
*      - Authorization: []
*    summary: "회원 정보 수정 기능"
*    description: 
*    tags: [Users]
*    parameters:
*      - in: path
*        name: userId
*        required: true
*        description: 수정할 유저 아이디
*        schema:
*          type: integer
*    requestBody:
*      required: true
*      description: 대표관리자만 name, phone_number, region_id 수정 가능
*      content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                name:
*                  type: string
*                  description: "이름"
*                  example: "김코딩"
*    responses:
*      400:
*        description: name, phone_number, region_id만 수정 가능(그 외 데이터 수정 불가) or 기존 데이터와 동일한 수정값
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
*                    example: "이름, 연락처, 담당 지역만 수정가능합니다. or 기존 {이름 or 연락처 or 지역ID} 와/과 동일합니다."
*      403:
*        description: 대표 관리자만 정보 수정 가능
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
*                    example: "지역 담당자는 정보 수정 권한이 없습니다."
*      404:
*        description: 존재하지 않는 user_id or 존재하지 않는 region_id
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                status:
*                    type: number
*                    example: 404
*                message:
*                    type: string
*                    example: "해당 유저는 존재하지 않습니다. or 존재하지 않는 지역ID 입니다."
*      200:
*        description: 이름 or 연락처 or 담당 지역ID 수정 완료
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
*                    example: "{이름 or 연락처 or 지역}을/를 수정했습니다."                     
*/
