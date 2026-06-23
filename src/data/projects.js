// Case studies, not cards. Problem -> Approach -> Outcome. Each maps back to a layer.
export const projects = [
  {
    title: 'Violence Detection & Alert System',
    layer: 'Intelligence',
    problem: "Manual CCTV monitoring can't catch violent incidents in real time, so response is reactive instead of immediate.",
    approach: 'Real-time computer-vision pipeline that detects violent activity in video streams and automatically triggers safety alerts.',
    outcome: 'Real-time detection with automated alerting.',
    stack: ['Python', 'YOLOv6', 'MobileNetV2'],
  },
  {
    title: 'Road Safety Surveillance',
    layer: 'Intelligence',
    problem: 'Road-safety violations go undetected without constant human monitoring.',
    approach: 'Computer-vision system that identifies and tracks road-safety violations in real time.',
    outcome: 'Real-time violation identification and tracking.',
    stack: ['Python', 'Computer Vision', 'Machine Learning'],
  },
  {
    title: 'Student Management System',
    layer: 'Product',
    problem: "Manual record-keeping for student data is error-prone and doesn't scale.",
    approach: 'Full-featured CLI application for CRUD operations on student records, built with clean object-oriented design.',
    outcome: 'Clean CRUD interface for student record management.',
    stack: ['Java', 'OOP'],
  },
]
