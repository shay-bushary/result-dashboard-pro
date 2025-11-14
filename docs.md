# **Testing & Results Dashboard**

**Live Demo** - [Github Repository](https://github.com/shay-bushary/result-dashboard-pro)

![Main Dashboard Overview](./images/dashboard-overview.png)
_Main dashboard showing the Testing & Results interface_

## **Project Overview**

This is a comprehensive testing and results dashboard designed for physical therapy and sports medicine professionals. The application allows users to manage test dates, create new tests, track results across different body parts, and visualize performance data.

## **Core Features**

### **1. Test Date Selection & Filtering**

The application provides a dropdown interface to select specific test dates, allowing users to filter and view results for individual testing sessions.

![Test Date Selection](./images/test-date-selection.png)
_Test date dropdown showing available testing sessions_

**Key Features:**

- Date-based filtering system
- Historical test session access
- Intuitive dropdown interface
- Mock data includes dates: 2025-01-15, 2025-02-10, 2025-03-05

### **2. Add Test Modal System**

Clicking "Create New Test" opens a comprehensive modal for creating new testing sessions.

![Add Test Modal](./images/add-test-modal.png)
_Modal interface for creating new tests with date, body part, and test selection_

**Modal Components:**

- **Date Picker**: Calendar interface for selecting test date
- **Body Part Selection**: Dropdown with predefined body parts
- **Test Selection**: Multi-select interface with search and categorization

### **3. Test Creation Flow**

Once the user selects **Date + Body Part + Tests**, the system generates individual test cards for data entry.

![Test Cards Flow](./images/test-cards-flow.png)
_Test cards generated after selection, showing different input types based on test category_

**Workflow:**

1. User selects date, body part, and tests
2. System generates appropriate test cards
3. Each test card provides specialized input fields
4. Data is saved and integrated into results

### **4. Results Display System**

When a test date is selected, the Results section becomes active with comprehensive data display and management options.

![Results Section](./images/results-section.png)
_Results section with tooltip information and control options_

**Results Features:**

- **Tooltip Information**: Color-coded performance indicators
  - 🔴 0-75%: Below expected
  - 🟡 75-99%: Near expected
  - 🟢 100%+: At or above expected
- **Edit Current Test**: Button to modify existing test data
- **Absolute/Percentage Toggle**: Switch between raw values and percentage of expected

### **5. Data Table Interface**

The results table displays comprehensive test data with the following columns:

![Results Table](./images/results-table.png)
_Results table showing test data with color-coded performance indicators_

**Table Columns:**

- **Test**: Test name (clickable for more details)
- **Unit**: Measurement unit (Degrees, Repetitions, Seconds, N, etc.)
- **Expected**: Target value for the test
- **Left**: Left side measurement (color-coded based on performance)
- **Right**: Right side measurement (color-coded based on performance)
- **No Laterality**: Single measurement for non-bilateral tests

**Color Coding:**

- Values are automatically color-coded based on performance relative to expected values
- Supports both absolute values and percentage display

## **Technical Implementation Details**

### **Body Part Categories**

The system supports the following body parts from the `body_parts` database table:

- Cervical Spine
- Thoracic Spine
- Lumbar Spine
- Shoulder
- Elbow
- Wrist
- Hip
- Knee
- Ankle

### **Test Categories & Organization**

Tests are organized into four main categories, displayed in this specific order:

![Test Categories](./images/test-categories.png)
_Test selection interface showing categorized tests with search and select all functionality_

#### **1. Range of Movement (ROM)**

- Cervical Flexion
- Cervical Extension
- Cervical Rotation
- Cervical Lateral Flexion
- **Unit**: Degrees
- **Input**: Left/Right bilateral measurements

#### **2. Endurance**

- Deep Neck Flexor Endurance Test
- Plank Hold
- Side Plank Hold
- **Unit**: Seconds
- **Input**: Single score value

#### **3. Strength**

- Cervical Flexion Strength
- Cervical Extension Strength
- Grip Strength
- **Unit**: N (Newtons) - RSI measuring standard
- **Input**: Score + Equipment selection
- **Special Features**: Equipment dropdown, "Set as default" checkbox

#### **4. Power**

- Vertical Jump
- Broad Jump
- Medicine Ball Throw
- **Unit**: Various (context-dependent)
- **Input**: Left/Right bilateral measurements

### **Test Card Specifications**

Each test type generates specialized input cards:

![Test Card Types](./images/test-card-types.png)
_Different test card layouts based on test category_

#### **Range of Movement Cards**

- Left/Right input fields
- Units displayed as "degrees"
- Bilateral measurement capability

#### **Endurance Cards**

- Single score input
- Time-based measurements in seconds
- Simple value entry

#### **Strength Cards**

![Strength Test Card](./images/strength-test-card.png)
_Strength test card showing equipment selection and default setting option_

- Score input field (N - Newtons)
- Equipment selection dropdown:
  - Dynamometer
  - Manual
  - Machine
- "Set as default" checkbox for preferred equipment
- RSI (Relative Strength Index) measuring unit

#### **Power Cards**

- Left/Right input fields
- Context-dependent units
- Bilateral measurement support

### **Advanced Features**

#### **Search & Selection Tools**

![Search and Select All](./images/search-select-all.png)
_Search interface with Select All functionality for efficient test selection_

- **Search Functionality**: Real-time filtering of tests by name
- **Select All Button**: One-click selection of all tests for faster workflow
- **Category Organization**: Tests grouped by type for easy navigation
- **Multi-select Interface**: Checkbox-based selection system

#### **Performance Visualization**

![Performance Chart](./images/performance-chart.png)
_Interactive chart showing test results with comparison capabilities_

- **Interactive Charts**: Visual representation of test results
- **Comparison Mode**: Select up to 2 tests for side-by-side comparison
- **Color-coded Data**: Visual performance indicators
- **Reference Lines**: Expected value indicators

#### **Video Integration**

- **Test Demonstration**: Each test includes video demonstration links
- **Modal Playback**: Integrated video player for test instructions
- **Educational Content**: YouTube integration for test procedures

## **User Experience Flow**

### **Complete Testing Workflow:**

1. **Initial Setup**

   - User selects or creates a test date
   - System provides access to test creation tools

2. **Test Creation**

   - Select body part from predefined list
   - Choose relevant tests from categorized options
   - Use search to quickly find specific tests
   - Utilize "Select All" for comprehensive testing

3. **Data Entry**

   - System generates appropriate test cards
   - Enter measurements based on test type
   - Configure equipment settings for strength tests
   - Set default preferences as needed

4. **Results Review**

   - View color-coded performance data
   - Toggle between absolute and percentage values
   - Access detailed tooltips for interpretation
   - Edit data as needed

5. **Analysis & Reporting**
   - Use interactive charts for visual analysis
   - Compare multiple tests simultaneously
   - Track progress over time
   - Export data for reporting

The application is designed to integrate with a backend database containing:

- `body_parts` table for body part definitions
- Test definitions and categories
- Historical test results
- User preferences and defaults
- Equipment configurations
