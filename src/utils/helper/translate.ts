export function translate(text: string) {
    switch (text) {
        case 'PENDING':
            return 'กำลังรอ'
        case 'CONFIRMED':
            return 'ยืนยันแล้ว'
        case 'COOKING':
            return 'กำลังปรุง'
        case 'SERVED':
            return 'ส่งแล้ว'
        case 'ALL_SERVED':
            return 'ส่งแล้วทั้งหมด';
        case 'BILLING':
            return 'กำลังออกบิล';
        case 'EACH':
            return 'จ่ายแยก';
        case 'SUM':
            return 'จ่ายรวม'
        case 'DIVINE':
            return 'หารจ่าย'
        case 'DIVIDE':
            return 'หารจ่าย'
        default:
            return text;
    }
}