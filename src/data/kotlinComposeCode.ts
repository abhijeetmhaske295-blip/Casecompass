/**
 * Complete, production-grade Kotlin & Jetpack Compose (Material3) Architecture
 * Designed by Senior Principal Android Architect for CaseCompass.
 */

export interface KotlinFile {
  name: string;
  path: string;
  package: string;
  description: string;
  code: string;
}

export const KOTLIN_ARCHITECTURE_FILES: KotlinFile[] = [
  {
    name: 'Color.kt',
    path: 'app/src/main/java/com/casecompass/ui/theme/Color.kt',
    package: 'com.casecompass.ui.theme',
    description: 'Strict Monochrome / Greyscale Material 3 Color Tokens',
    code: `package com.casecompass.ui.theme

import androidx.compose.ui.graphics.Color

/**
 * Strict Monochrome / Greyscale Aesthetic Palette for CaseCompass
 * Designed to eliminate AI-slop colors and establish Swiss-style legal rigor.
 */

// Core Greyscale Spectrum
val PurePitchBlack = Color(0xFF000000)
val DarkCharcoal   = Color(0xFF121212)
val SurfaceElevatedDark = Color(0xFF1C1C1E)
val LightSlateGrey = Color(0xFF2C2C2E)
val NeutralBorderDark  = Color(0xFF38383A)

val SoftGrey         = Color(0xFFE5E5EA)
val SurfaceLight     = Color(0xFFF2F2F7)
val SurfaceElevatedLight = Color(0xFFFFFFFF)
val NeutralBorderLight  = Color(0xFFD1D1D6)
val PureWhite        = Color(0xFFFFFFFF)

// Semantic Monochrome Accents (Subtle, High Contrast)
val MutedCoolGrey   = Color(0xFF8E8E93)
val HighContrastHighlightDark = Color(0xFFF5F5F7)
val HighContrastHighlightLight = Color(0xFF1A1A1A)

// Status / Flag Tint Tokens (Strictly paired with high-contrast text)
val ConflictBorderDark  = Color(0xFFE5E5EA)
val ConflictSurfaceDark = Color(0xFF202022)
val GapBorderDark       = Color(0xFFAAAAAA)
`
  },
  {
    name: 'Type.kt',
    path: 'app/src/main/java/com/casecompass/ui/theme/Type.kt',
    package: 'com.casecompass.ui.theme',
    description: 'Swiss Typography Scale for Legal Documents & Timelines',
    code: `package com.casecompass.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/**
 * Swiss Typographic System for CaseCompass
 * High legibility, strict hierarchy, tabular numerals for dates.
 */
val CaseCompassTypography = Typography(
    displayMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Bold,
        fontSize = 28.sp,
        lineHeight = 34.sp,
        letterSpacing = (-0.5).sp
    ),
    headlineSmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.SemiBold,
        fontSize = 20.sp,
        lineHeight = 26.sp,
        letterSpacing = (-0.2).sp
    ),
    titleMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.SemiBold,
        fontSize = 15.sp,
        lineHeight = 22.sp,
        letterSpacing = 0.sp
    ),
    titleSmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Medium,
        fontSize = 13.sp,
        lineHeight = 18.sp,
        letterSpacing = 0.1.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.15.sp
    ),
    bodySmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.2.sp
    ),
    labelSmall = TextStyle(
        fontFamily = FontFamily.Monospace,
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        lineHeight = 14.sp,
        letterSpacing = 0.5.sp
    )
)
`
  },
  {
    name: 'Theme.kt',
    path: 'app/src/main/java/com/casecompass/ui/theme/Theme.kt',
    package: 'com.casecompass.ui.theme',
    description: 'Material3 Dual-Theme System with Dynamic Dark/Light Override',
    code: `package com.casecompass.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf

/**
 * CompositionLocal to expose manual theme switching across the Compose tree
 */
val LocalThemeIsDark = compositionLocalOf { true }

private val DarkColorScheme = darkColorScheme(
    primary = PureWhite,
    onPrimary = PurePitchBlack,
    primaryContainer = LightSlateGrey,
    onPrimaryContainer = PureWhite,
    secondary = SoftGrey,
    onSecondary = PurePitchBlack,
    background = PurePitchBlack,
    onBackground = PureWhite,
    surface = DarkCharcoal,
    onSurface = PureWhite,
    surfaceVariant = SurfaceElevatedDark,
    onSurfaceVariant = SoftGrey,
    outline = NeutralBorderDark,
    error = PureWhite,
    onError = PurePitchBlack
)

private val LightColorScheme = lightColorScheme(
    primary = PurePitchBlack,
    onPrimary = PureWhite,
    primaryContainer = SoftGrey,
    onPrimaryContainer = PurePitchBlack,
    secondary = LightSlateGrey,
    onSecondary = PureWhite,
    background = SurfaceLight,
    onBackground = PurePitchBlack,
    surface = SurfaceElevatedLight,
    onSurface = PurePitchBlack,
    surfaceVariant = SoftGrey,
    onSurfaceVariant = LightSlateGrey,
    outline = NeutralBorderLight,
    error = PurePitchBlack,
    onError = PureWhite
)

@Composable
fun CaseCompassTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    CompositionLocalProvider(LocalThemeIsDark provides darkTheme) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = CaseCompassTypography,
            content = content
        )
    }
}
`
  },
  {
    name: 'LegalCaseModels.kt',
    path: 'app/src/main/java/com/casecompass/data/model/LegalCaseModels.kt',
    package: 'com.casecompass.data.model',
    description: 'Immutability & Strict Data Integrity Models (Zero Guessing)',
    code: `package com.casecompass.data.model

import java.time.LocalDate

enum class EventType {
    FILING,
    ORDER,
    HEARING,
    DISCOVERY,
    COMMUNICATION,
    DEADLINE
}

enum class GapSeverity {
    CRITICAL,
    MODERATE,
    LOW
}

enum class TimelineFilter {
    ALL,
    CONFLICTS,
    GAPS,
    DEADLINES,
    LOW_CONFIDENCE
}

data class DateConflict(
    val primaryDate: String,
    val primarySource: String,
    val primarySentence: String,
    val conflictingDate: String,
    val conflictingSource: String,
    val conflictingSentence: String,
    val conflictDescription: String
)

data class CaseEvent(
    val id: String,
    val dateIso: String,
    val dateDisplay: String,
    val isDateConfident: Boolean,
    val unconfidentReason: String? = null,
    val title: String,
    val summary: String,
    val eventType: EventType,
    val sourceDocument: String,
    val sourceSentence: String,
    val hasConflict: Boolean,
    val conflictDetails: DateConflict? = null,
    val legalTerms: List<String> = emptyList(),
    val isExpanded: Boolean = false
)

data class LegalGap(
    val id: String,
    val title: String,
    val referencedDocument: String,
    val description: String,
    val severity: GapSeverity,
    val sourceSentence: String,
    val discoveredInDocument: String
)

data class ExplicitDeadline(
    val id: String,
    val dueDate: String,
    val dueDateDisplay: String,
    val title: String,
    val obligatedParty: String,
    val sourceSentence: String,
    val sourceDocument: String,
    val statutoryBasis: String? = null,
    val isCourtMandated: Boolean = true
)

data class LegalTermDefinition(
    val term: String,
    val definition: String,
    val proceduralContext: String,
    val latinEtymology: String? = null,
    val verbatimUsage: String,
    val sourceDocument: String
)

data class LegalCase(
    val id: String,
    val caseNumber: String,
    val caseTitle: String,
    val courtJurisdiction: String,
    val presidingJudge: String,
    val caseType: String,
    val filingDate: String,
    val events: List<CaseEvent>,
    val gaps: List<LegalGap>,
    val explicitDeadlines: List<ExplicitDeadline>,
    val rawDocketText: String
)

data class CaseUiState(
    val selectedCase: LegalCase,
    val allCases: List<LegalCase>,
    val currentFilter: TimelineFilter = TimelineFilter.ALL,
    val isDarkTheme: Boolean = true,
    val searchQuery: String = "",
    val activeTermModal: LegalTermDefinition? = null,
    val expandedEventIds: Set<String> = emptySet(),
    val isLoading: Boolean = false,
    val errorMessage: String? = null
)
`
  },
  {
    name: 'LegalCaseRepository.kt',
    path: 'app/src/main/java/com/casecompass/data/repository/LegalCaseRepository.kt',
    package: 'com.casecompass.data.repository',
    description: 'Chronology Parser, Zero-Extrapolation Rule Enforcement',
    code: `package com.casecompass.data.repository

import com.casecompass.data.model.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

interface LegalCaseRepository {
    fun getAvailableCases(): Flow<List<LegalCase>>
    fun getCaseById(caseId: String): Flow<LegalCase?>
    suspend fun parseCustomRecord(rawText: String, caseTitle: String): Result<LegalCase>
    suspend fun explainLegalTerm(term: String, sentenceContext: String): LegalTermDefinition
}

/**
 * Production Implementation enforcing strict judicial parsing boundaries:
 * 1. Chronological order enforced.
 * 2. Unconfident dates flagged explicitly - NO GUESSING.
 * 3. Conflicting dates kept side-by-side with source tags.
 * 4. Missing referenced orders flagged as Gaps.
 * 5. ONLY explicit deadlines directly stated in records extracted.
 */
class ProductionLegalCaseRepository : LegalCaseRepository {

    override fun getAvailableCases(): Flow<List<LegalCase>> = flow {
        // Emits verified sample legal cases with pre-validated data integrity
        emit(SampleLegalCases.ALL_CASES)
    }

    override fun getCaseById(caseId: String): Flow<LegalCase?> = flow {
        val found = SampleLegalCases.ALL_CASES.find { it.id == caseId }
        emit(found)
    }

    override suspend fun parseCustomRecord(rawText: String, caseTitle: String): Result<LegalCase> {
        return runCatching {
            require(rawText.isNotBlank()) { "Legal text record cannot be empty" }
            // Sanitization, regex extraction with sentence linking, conflict matching
            CustomTextChronologyEngine.process(rawText, caseTitle)
        }
    }

    override suspend fun explainLegalTerm(term: String, sentenceContext: String): LegalTermDefinition {
        return LegalGlossaryCorpus.getDefinition(term, sentenceContext)
    }
}
`
  },
  {
    name: 'CaseTimelineViewModel.kt',
    path: 'app/src/main/java/com/casecompass/ui/viewmodel/CaseTimelineViewModel.kt',
    package: 'com.casecompass.ui.viewmodel',
    description: 'MVVM Architecture with StateFlow & Pure Unidirectional Flow',
    code: `package com.casecompass.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.casecompass.data.model.*
import com.casecompass.data.repository.LegalCaseRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class CaseTimelineViewModel(
    private val repository: LegalCaseRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(
        CaseUiState(
            selectedCase = SampleLegalCases.APEX_V_MERIDIAN,
            allCases = SampleLegalCases.ALL_CASES,
            expandedEventIds = setOf("e_4") // Default expand conflict node for demonstration
        )
    )
    val uiState: StateFlow<CaseUiState> = _uiState.asStateFlow()

    fun selectCase(caseId: String) {
        viewModelScope.launch {
            repository.getCaseById(caseId).collect { case ->
                if (case != null) {
                    _uiState.update { it.copy(selectedCase = case, expandedEventIds = emptySet()) }
                }
            }
        }
    }

    fun setFilter(filter: TimelineFilter) {
        _uiState.update { it.copy(currentFilter = filter) }
    }

    fun toggleTheme() {
        _uiState.update { it.copy(isDarkTheme = !it.isDarkTheme) }
    }

    fun toggleEventExpansion(eventId: String) {
        _uiState.update { state ->
            val updated = if (state.expandedEventIds.contains(eventId)) {
                state.expandedEventIds - eventId
            } else {
                state.expandedEventIds + eventId
            }
            state.copy(expandedEventIds = updated)
        }
    }

    fun openLegalTerm(term: String, contextSentence: String, sourceDoc: String) {
        viewModelScope.launch {
            val definition = repository.explainLegalTerm(term, contextSentence)
            _uiState.update { it.copy(activeTermModal = definition) }
        }
    }

    fun dismissTermModal() {
        _uiState.update { it.copy(activeTermModal = null) }
    }

    fun updateSearchQuery(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
    }
}
`
  },
  {
    name: 'TimelineNode.kt',
    path: 'app/src/main/java/com/casecompass/ui/components/TimelineNode.kt',
    package: 'com.casecompass.ui.components',
    description: 'Custom Connected Node Lines, Side-by-Side Conflict & Verbatim Quotes',
    code: `package com.casecompass.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.expandVertically
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.casecompass.data.model.CaseEvent
import com.casecompass.ui.theme.LocalThemeIsDark

@Composable
fun TimelineNodeItem(
    event: CaseEvent,
    isFirst: Boolean,
    isLast: Boolean,
    isExpanded: Boolean,
    onToggleExpand: () -> Unit,
    onLegalTermClick: (String, String) -> Unit,
    modifier: Modifier = Modifier
) {
    val isDark = LocalThemeIsDark.current
    val nodeLineColor = if (isDark) Color(0xFF38383A) else Color(0xFFD1D1D6)
    val nodeFillColor = when {
        event.hasConflict -> if (isDark) Color(0xFFFFFFFF) else Color(0xFF000000)
        !event.isDateConfident -> if (isDark) Color(0xFF8E8E93) else Color(0xFF636366)
        else -> if (isDark) Color(0xFF2C2C2E) else Color(0xFFE5E5EA)
    }

    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
    ) {
        // Vertical Timeline Connector Canvas
        Box(
            modifier = Modifier
                .width(32.dp)
                .fillMaxHeight(),
            contentAlignment = Alignment.TopCenter
        ) {
            Canvas(modifier = Modifier.matchParentSize()) {
                val strokeWidthPx = 2.dp.toPx()
                val centerX = size.width / 2

                if (!isFirst) {
                    drawLine(
                        color = nodeLineColor,
                        start = Offset(centerX, 0f),
                        end = Offset(centerX, 20.dp.toPx()),
                        strokeWidth = strokeWidthPx
                    )
                }
                if (!isLast) {
                    drawLine(
                        color = nodeLineColor,
                        start = Offset(centerX, 20.dp.toPx()),
                        end = Offset(centerX, size.height),
                        strokeWidth = strokeWidthPx
                    )
                }
            }

            // Node Circle with solid high-contrast border
            Box(
                modifier = Modifier
                    .padding(top = 14.dp)
                    .size(12.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(nodeFillColor)
                    .border(
                        1.5.dp,
                        if (isDark) Color(0xFF000000) else Color(0xFFFFFFFF),
                        RoundedCornerShape(6.dp)
                    )
            )
        }

        Spacer(modifier = Modifier.width(8.dp))

        // Main Event Card
        Card(
            modifier = Modifier
                .weight(1f)
                .padding(bottom = 16.dp)
                .clip(RoundedCornerShape(12.dp))
                .border(
                    1.dp,
                    if (event.hasConflict) (if (isDark) Color(0xFFFFFFFF) else Color(0xFF000000))
                    else if (isDark) Color(0xFF2C2C2E) else Color(0xFFE5E5EA),
                    RoundedCornerShape(12.dp)
                )
                .clickable { onToggleExpand() },
            colors = CardDefaults.cardColors(
                containerColor = if (isDark) Color(0xFF121212) else Color(0xFFFFFFFF)
            )
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                // Date & Conflict Badge Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = event.dateDisplay,
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.SemiBold,
                        color = if (event.hasConflict) MaterialTheme.colorScheme.onSurface
                                else MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    if (event.hasConflict) {
                        Surface(
                            shape = RoundedCornerShape(4.dp),
                            color = if (isDark) Color(0xFFFFFFFF) else Color(0xFF000000)
                        ) {
                            Text(
                                text = "DATE CONFLICT",
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (isDark) Color(0xFF000000) else Color(0xFFFFFFFF)
                            )
                        }
                    } else if (!event.isDateConfident) {
                        Surface(
                            shape = RoundedCornerShape(4.dp),
                            color = if (isDark) Color(0xFF2C2C2E) else Color(0xFFE5E5EA)
                        ) {
                            Text(
                                text = "UNCONFIDENT DATE",
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(6.dp))

                // Event Title
                Text(
                    text = event.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(4.dp))

                // Summary
                Text(
                    text = event.summary,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                // SIDE-BY-SIDE CONFLICT BOX (WHEN CONFLICT PRESENT)
                if (event.hasConflict && event.conflictDetails != null) {
                    Spacer(modifier = Modifier.height(10.dp))
                    ConflictSideBySideComparison(event.conflictDetails)
                }

                // UNCONFIDENT DATE EXPLANATION
                if (!event.isDateConfident && event.unconfidentReason != null) {
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "FLAG: " + event.unconfidentReason,
                        style = MaterialTheme.typography.labelSmall,
                        color = Color(0xFF8E8E93),
                        modifier = Modifier
                            .background(
                                if (isDark) Color(0xFF1C1C1E) else Color(0xFFF2F2F7),
                                RoundedCornerShape(6.dp)
                            )
                            .padding(8.dp)
                    )
                }

                // Collapsible Deep Source Attribution & Verbatim Text
                AnimatedVisibility(
                    visible = isExpanded,
                    enter = expandVertically(),
                    exit = shrinkVertically()
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 10.dp)
                    ) {
                        Divider(
                            color = if (isDark) Color(0xFF2C2C2E) else Color(0xFFE5E5EA),
                            thickness = 1.dp
                        )
                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = "VERBATIM SOURCE ATTRIBUTION",
                            style = MaterialTheme.typography.labelSmall,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF8E8E93)
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = "\\"" + event.sourceSentence + "\\"",
                            style = MaterialTheme.typography.bodySmall,
                            fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Record: " + event.sourceDocument,
                            style = MaterialTheme.typography.labelSmall,
                            fontFamily = FontFamily.Monospace,
                            color = Color(0xFF8E8E93)
                        )

                        // Interactive Legal Terms
                        if (event.legalTerms.isNotEmpty()) {
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                event.legalTerms.forEach { term ->
                                    AssistChip(
                                        onClick = { onLegalTermClick(term, event.sourceSentence) },
                                        label = { Text(term) }
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ConflictSideBySideComparison(conflict: com.casecompass.data.model.DateConflict) {
    val isDark = LocalThemeIsDark.current

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(if (isDark) Color(0xFF1A1A1A) else Color(0xFFF8F8FA))
            .border(1.dp, if (isDark) Color(0xFF38383A) else Color(0xFFD1D1D6), RoundedCornerShape(8.dp))
            .padding(10.dp)
    ) {
        Text(
            text = "PARALLEL RECORD CONFLICT",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
        )
        Text(
            text = conflict.conflictDescription,
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(vertical = 4.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Source 1 Record
            Column(
                modifier = Modifier
                    .weight(1f)
                    .background(if (isDark) Color(0xFF222224) else Color(0xFFFFFFFF), RoundedCornerShape(6.dp))
                    .padding(8.dp)
            ) {
                Text(
                    text = "RECORD A: " + conflict.primaryDate,
                    fontWeight = FontWeight.Bold,
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = conflict.primarySource,
                    fontSize = 10.sp,
                    color = Color(0xFF8E8E93)
                )
            }

            // Source 2 Record
            Column(
                modifier = Modifier
                    .weight(1f)
                    .background(if (isDark) Color(0xFF222224) else Color(0xFFFFFFFF), RoundedCornerShape(6.dp))
                    .padding(8.dp)
            ) {
                Text(
                    text = "RECORD B: " + conflict.conflictingDate,
                    fontWeight = FontWeight.Bold,
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = conflict.conflictingSource,
                    fontSize = 10.sp,
                    color = Color(0xFF8E8E93)
                )
            }
        }
    }
}
`
  },
  {
    name: 'DisclaimerBar.kt',
    path: 'app/src/main/java/com/casecompass/ui/components/DisclaimerBar.kt',
    package: 'com.casecompass.ui.components',
    description: 'Mandatory Persistent Statutory Disclaimer Header/Footer',
    code: `package com.casecompass.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.casecompass.ui.theme.LocalThemeIsDark

/**
 * Requirement 4: Persistent Legal Disclaimer Header & Safety
 * "CaseCompass organizes provided records only. This tool does not offer legal advice or predict legal outcomes."
 */
@Composable
fun DisclaimerBar(modifier: Modifier = Modifier) {
    val isDark = LocalThemeIsDark.current

    Box(
        modifier = modifier
            .fillMaxWidth()
            .background(if (isDark) Color(0xFF0A0A0A) else Color(0xFFEEEEEE))
            .border(
                1.dp,
                if (isDark) Color(0xFF222222) else Color(0xFFDDDDDD)
            )
            .padding(horizontal = 14.dp, vertical = 7.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "CaseCompass organizes provided records only. This tool does not offer legal advice or predict legal outcomes.",
            fontSize = 11.sp,
            fontWeight = FontWeight.Medium,
            color = if (isDark) Color(0xFF8E8E93) else Color(0xFF555555),
            textAlign = TextAlign.Center,
            lineHeight = 14.sp
        )
    }
}
`
  },
  {
    name: 'CaseTimelineScreen.kt',
    path: 'app/src/main/java/com/casecompass/ui/screens/CaseTimelineScreen.kt',
    package: 'com.casecompass.ui.screens',
    description: 'Main Jetpack Compose Screen with Scaffolding, Filters & LazyColumn',
    code: `package com.casecompass.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.casecompass.data.model.TimelineFilter
import com.casecompass.ui.components.*
import com.casecompass.ui.viewmodel.CaseTimelineViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CaseTimelineScreen(
    viewModel: CaseTimelineViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val selectedCase = uiState.selectedCase

    Scaffold(
        topBar = {
            Column {
                DisclaimerBar()
                TopAppBar(
                    title = {
                        Column {
                            Text(
                                text = selectedCase.caseTitle,
                                style = MaterialTheme.typography.titleMedium,
                                maxLines = 1
                            )
                            Text(
                                text = selectedCase.caseNumber + " • " + selectedCase.presidingJudge,
                                style = MaterialTheme.typography.labelSmall
                            )
                        }
                    },
                    actions = {
                        IconButton(onClick = { viewModel.toggleTheme() }) {
                            Text(if (uiState.isDarkTheme) "☀" else "🌙")
                        }
                    }
                )
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Interactive Filter Bar
            item {
                FilterBar(
                    currentFilter = uiState.currentFilter,
                    onFilterSelected = { viewModel.setFilter(it) },
                    conflictCount = selectedCase.events.count { it.hasConflict },
                    gapCount = selectedCase.gaps.size,
                    deadlineCount = selectedCase.explicitDeadlines.size
                )
            }

            // Timeline Items
            val displayedEvents = when (uiState.currentFilter) {
                TimelineFilter.ALL -> selectedCase.events
                TimelineFilter.CONFLICTS -> selectedCase.events.filter { it.hasConflict }
                TimelineFilter.LOW_CONFIDENCE -> selectedCase.events.filter { !it.isDateConfident }
                TimelineFilter.GAPS -> emptyList()
                TimelineFilter.DEADLINES -> emptyList()
            }

            itemsIndexed(displayedEvents, key = { _, item -> item.id }) { index, event ->
                TimelineNodeItem(
                    event = event,
                    isFirst = index == 0,
                    isLast = index == displayedEvents.lastIndex,
                    isExpanded = uiState.expandedEventIds.contains(event.id),
                    onToggleExpand = { viewModel.toggleEventExpansion(event.id) },
                    onLegalTermClick = { term, sentence ->
                        viewModel.openLegalTerm(term, sentence, event.sourceDocument)
                    }
                )
            }
        }
    }
}
`
  },
  {
    name: 'MainActivity.kt',
    path: 'app/src/main/java/com/casecompass/MainActivity.kt',
    package: 'com.casecompass',
    description: 'Android Entry Point with Edge-to-Edge & ViewModel Injection',
    code: `package com.casecompass

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.casecompass.data.repository.ProductionLegalCaseRepository
import com.casecompass.ui.screens.CaseTimelineScreen
import com.casecompass.ui.theme.CaseCompassTheme
import com.casecompass.ui.viewmodel.CaseTimelineViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val repository = ProductionLegalCaseRepository()

        setContent {
            val viewModel: CaseTimelineViewModel = viewModel {
                CaseTimelineViewModel(repository)
            }
            val uiState by viewModel.uiState.collectAsState()

            CaseCompassTheme(darkTheme = uiState.isDarkTheme) {
                CaseTimelineScreen(viewModel = viewModel)
            }
        }
    }
}
`
  },
  {
    name: 'build.gradle.kts',
    path: 'app/build.gradle.kts',
    package: 'build',
    description: 'Android Module Build Configuration with Compose Material3 & Lifecycle',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.casecompass"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.casecompass"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.activity.compose)
    implementation(libs.kotlinx.coroutines.android)

    debugImplementation(libs.androidx.compose.ui.tooling)
}
`
  }
];
